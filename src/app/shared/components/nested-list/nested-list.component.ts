import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import { EventEmitter, Input, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import {Component, Injectable, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';

export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
let TREE_DATA = {
  Groceries: {
    'Almond Meal flour': null,
    'Organic eggs': null,
    'Protein Powder': null,
    Fruits: {
      Apple: null,
      Berries: ['Blueberry', 'Raspberry'],
      Orange: null
    }
  },
  Reminders: [
    'Cook dinner',
    'Read the Material Design spec',
    'Upgrade Application to Angular'
  ]
};


@Component({
  selector: 'rms-nested-list',
  templateUrl: './nested-list.component.html',
  styleUrls: ['./nested-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NestedListComponent implements OnInit {
  @Input() listData: any;
  @Output() onCheckboxChange = new EventEmitter();
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }
   /** Map from flat node to nested node. This helps us finding the nested node to be modified */
   flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

   /** Map from nested node to flattened node. This helps us to keep the same object for selection */
   nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
 
   /** A selected parent node to be inserted */
   selectedParent: TodoItemFlatNode | null = null;
 
   /** The new item's name */
   newItemName = '';
 
   treeControl: FlatTreeControl<TodoItemFlatNode>;
 
   treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
 
   dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
 
   /** The selection for checklist */
   checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
 
   constructor() {
     this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
       this.isExpandable, this.getChildren);
     this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
     this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
 
     this.dataChange.subscribe(data => {
       this.dataSource.data = data;
     });
   }

   ngOnChanges(changes: SimpleChanges) {
    this.initialize();   
   }

   ngOnInit(): void {
    this.initialize();    
   } 

    onChange(val) {
      this.onCheckboxChange.emit(val);
    }
 
   getLevel = (node: TodoItemFlatNode) => node.level;
 
   isExpandable = (node: TodoItemFlatNode) => node.expandable;
 
   getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;
 
   hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;
 
   hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';
 
   /**
    * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
    */
   transformer = (node: TodoItemNode, level: number) => {
     const existingNode = this.nestedNodeMap.get(node);
     const flatNode = existingNode && existingNode.item === node.item
         ? existingNode
         : new TodoItemFlatNode();
     flatNode.item = node.item;
     flatNode.level = level;
     flatNode.expandable = !!node.children?.length;
     this.flatNodeMap.set(flatNode, node);
     this.nestedNodeMap.set(node, flatNode);
     return flatNode;
   }
 
   /** Whether all the descendants of the node are selected. */
   descendantsAllSelected(node: TodoItemFlatNode): boolean {
     const descendants = this.treeControl.getDescendants(node);
     const descAllSelected = descendants.length > 0 && descendants.every(child => {
       return this.checklistSelection.isSelected(child);
     });
     return descAllSelected;
   }
 
   /** Whether part of the descendants are selected */
   descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
     const descendants = this.treeControl.getDescendants(node);
     const result = descendants.some(child => this.checklistSelection.isSelected(child));
     return result && !this.descendantsAllSelected(node);
   }
 
   /** Toggle the to-do item selection. Select/deselect all the descendants node */
   todoItemSelectionToggle(node: TodoItemFlatNode): void {
     this.checklistSelection.toggle(node);
     const descendants = this.treeControl.getDescendants(node);
     this.checklistSelection.isSelected(node)
       ? this.checklistSelection.select(...descendants)
       : this.checklistSelection.deselect(...descendants);
 
     // Force update for the parent
     descendants.forEach(child => this.checklistSelection.isSelected(child));
     this.checkAllParentsSelection(node);
   }
 
   /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
   todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
     this.checklistSelection.toggle(node);
     this.checkAllParentsSelection(node);
   }
 
   /* Checks all the parents when a leaf node is selected/unselected */
   checkAllParentsSelection(node: TodoItemFlatNode): void {
     let parent: TodoItemFlatNode | null = this.getParentNode(node);
     while (parent) {
       this.checkRootNodeSelection(parent);
       parent = this.getParentNode(parent);
     }
   }
 
   /** Check root node checked state and change it accordingly */
   checkRootNodeSelection(node: TodoItemFlatNode): void {
     const nodeSelected = this.checklistSelection.isSelected(node);
     const descendants = this.treeControl.getDescendants(node);
     const descAllSelected = descendants.length > 0 && descendants.every(child => {
       return this.checklistSelection.isSelected(child);
     });
     if (nodeSelected && !descAllSelected) {
       this.checklistSelection.deselect(node);
     } else if (!nodeSelected && descAllSelected) {
       this.checklistSelection.select(node);
     }
   }
 
   /* Get the parent node of a node */
   getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
     const currentLevel = this.getLevel(node);
 
     if (currentLevel < 1) {
       return null;
     }
 
     const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
 
     for (let i = startIndex; i >= 0; i--) {
       const currentNode = this.treeControl.dataNodes[i];
 
       if (this.getLevel(currentNode) < currentLevel) {
         return currentNode;
       }
     }
     return null;
   }

   //values = this.checklistSelection.selected 

   getSelected() {
    return this.checklistSelection.selected;
   }

   getLength() {
    return this.treeControl.dataNodes.length;
   }

   checkAll(){
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
      if(!this.checklistSelection.isSelected(this.treeControl.dataNodes[i]))
        this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
      this.treeControl.expand(this.treeControl.dataNodes[i])
    }
  }

  uncheckAll(){
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
      if(this.checklistSelection.isSelected(this.treeControl.dataNodes[i]))
        this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
      this.treeControl.expand(this.treeControl.dataNodes[i])
    }
  }

   initialize() {     
    const data = this.buildFileTree(this.listData, 0);
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}
