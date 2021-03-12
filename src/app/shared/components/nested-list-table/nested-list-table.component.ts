import {SelectionModel} from '@angular/cdk/collections';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, EventEmitter, Injectable, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTree, MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import {BehaviorSubject} from 'rxjs';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
  assigned: boolean;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
  assigned: boolean
}

@Component({
  selector: 'rms-nested-list-table',
  templateUrl: './nested-list-table.component.html',
  styleUrls: ['./nested-list-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NestedListTableComponent implements OnInit {
  @ViewChild('treeAssigned') treeAssigned: MatTree<any>;
  @ViewChild('treeUnassigned') treeUnassigned: MatTree<any>;
  @Input() listData: any;
  @Input() category: string;
  @Output() onCheckboxChange = new EventEmitter();
  @Output() toAssigned = new EventEmitter();
  @Output() toUnassigned = new EventEmitter();
  @Output() onDrag = new EventEmitter();
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
   treeControlAssigned: FlatTreeControl<TodoItemFlatNode>;
 
   treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
 
   dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
   dataSourceAssigned: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
 
   /** The selection for checklist */
   checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
   checklistSelectionAssigned = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
 
   constructor() {
     this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
       this.isExpandable, this.getChildren);
     this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
     this.treeControlAssigned = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
     this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
     this.dataSourceAssigned = new MatTreeFlatDataSource(this.treeControlAssigned, this.treeFlattener);
 
     this.dataChange.subscribe(data => {
       this.dataSource.data = data;
       this.dataSourceAssigned.data = data;
     });
   }

   ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      this.initialize();   
    }, 300);  
   }

   ngOnInit(): void {
    setTimeout(() => {
      this.initialize();   
    }, 300); 
   } 

    onChange(val) {
      this.onCheckboxChange.emit(val);
    }
 
   getLevel = (node: TodoItemFlatNode) => node.level;
 
   isExpandable = (node: TodoItemFlatNode) => node.expandable;

   isAssigned = (node: TodoItemFlatNode) => node.assigned;
 
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
    flatNode.assigned = !!node.assigned;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }
 
   /** Whether all the descendants of the node are selected. */
   descendantsAllSelected(node: TodoItemFlatNode): boolean {
     const descendants = this.treeControl.getDescendants(node);
     const filtredDescendants = descendants.filter((item) => !item.assigned);
     const descAllSelected = filtredDescendants.length > 0 && filtredDescendants.every(child => {
       return this.checklistSelection.isSelected(child);
     });
     return descAllSelected;
   }

   descendantsAllSelectedAssigned(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControlAssigned.getDescendants(node);
    const filtredDescendants = descendants.filter((item) => item.assigned); 
    const descAllSelected = filtredDescendants.length > 0 && filtredDescendants.every(child => {
      return this.checklistSelectionAssigned.isSelected(child);
    });
    return descAllSelected;
  }
 
   /** Whether part of the descendants are selected */
   descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
     const descendants = this.treeControl.getDescendants(node);
     const result = descendants.some(child => this.checklistSelection.isSelected(child));
     return result && !this.descendantsAllSelected(node);
   }

   descendantsPartiallySelectedAssigned(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControlAssigned.getDescendants(node);
    const result = descendants.some(child => this.checklistSelectionAssigned.isSelected(child));
    return result && !this.descendantsAllSelectedAssigned(node);
  }
 
   /** Toggle the to-do item selection. Select/deselect all the descendants node */
   todoItemSelectionToggle(node: TodoItemFlatNode): void {     
     this.checklistSelection.toggle(node);
     const descendants = this.treeControl.getDescendants(node);
     const filtredDescendants = descendants.filter((item) => !item.assigned);
     this.checklistSelection.isSelected(node)
       ? this.checklistSelection.select(...filtredDescendants)
       : this.checklistSelection.deselect(...filtredDescendants);
 
     // Force update for the parent
     descendants.forEach(child => this.checklistSelection.isSelected(child));
     this.checkAllParentsSelection(node);
   }

   todoItemSelectionToggleAssigned(node: TodoItemFlatNode): void {
    this.checklistSelectionAssigned.toggle(node);
    const descendants = this.treeControlAssigned.getDescendants(node);
    const filtredDescendants = descendants.filter((item) => item.assigned) 
    this.checklistSelectionAssigned.isSelected(node)
      ? this.checklistSelectionAssigned.select(...filtredDescendants)
      : this.checklistSelectionAssigned.deselect(...filtredDescendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelectionAssigned.isSelected(child));
    this.checkAllParentsSelectionAssigned(node);
  }
 
   /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
   todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
     this.checklistSelection.toggle(node);
     this.checkAllParentsSelection(node);
   }

   todoLeafItemSelectionToggleAssigned(node: TodoItemFlatNode): void {
    this.checklistSelectionAssigned.toggle(node);
    this.checkAllParentsSelectionAssigned(node);
  }
 
   /* Checks all the parents when a leaf node is selected/unselected */
   checkAllParentsSelection(node: TodoItemFlatNode): void {
     let parent: TodoItemFlatNode | null = this.getParentNode(node);
     while (parent) {
       this.checkRootNodeSelection(parent);
       parent = this.getParentNode(parent);
     }
   }

   checkAllParentsSelectionAssigned(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNodeAssigned(node);
    while (parent) {
      this.checkRootNodeSelectionAssigned(parent);
      parent = this.getParentNodeAssigned(parent);
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

   checkRootNodeSelectionAssigned(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelectionAssigned.isSelected(node);
    const descendants = this.treeControlAssigned.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelectionAssigned.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelectionAssigned.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelectionAssigned.select(node);
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

   getParentNodeAssigned(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControlAssigned.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControlAssigned.dataNodes[i];

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

   getSelectedAssigned() {
    return this.checklistSelectionAssigned.selected;
   }

   getLengthAssigned() {
    return this.treeControlAssigned.dataNodes.length;
   }

   checkAll(){
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
      if(!this.checklistSelection.isSelected(this.treeControl.dataNodes[i]))
        this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
      this.treeControl.expand(this.treeControl.dataNodes[i])
    }
  }

  checkAllAssigned(){
    for (let i = 0; i < this.treeControlAssigned.dataNodes.length; i++) {
      if(!this.checklistSelectionAssigned.isSelected(this.treeControlAssigned.dataNodes[i]))
        this.checklistSelectionAssigned.toggle(this.treeControlAssigned.dataNodes[i]);
      this.treeControlAssigned.expand(this.treeControlAssigned.dataNodes[i])
    }
  }

  uncheckAll(){
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
      if(this.checklistSelection.isSelected(this.treeControl.dataNodes[i]))
        this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
      this.treeControl.expand(this.treeControl.dataNodes[i])
    }
  }

  uncheckAllAssigned(){
    for (let i = 0; i < this.treeControlAssigned.dataNodes.length; i++) {
      if(this.checklistSelectionAssigned.isSelected(this.treeControlAssigned.dataNodes[i]))
        this.checklistSelectionAssigned.toggle(this.treeControlAssigned.dataNodes[i]);
      this.treeControlAssigned.expand(this.treeControlAssigned.dataNodes[i])
    }
  }


   initialize() {
    const data = this.buildFileTree(this.listData[this.category], 0);
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(arr: any, level: number): any {
    return arr.reduce((accumulator: any, key: any) => {
      const value = key.childGroups;
      const node = new TodoItemNode();
      node.item = key.name;
      node.assigned = key.assigned;

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

  onPressToUnassigned() {
    const list = this.checklistSelectionAssigned.selected;
    this.toUnassigned.emit(list);
    this.checklistSelectionAssigned.clear();
  }

  onPressToAssigned() {
    const list = this.checklistSelection.selected;
    this.toAssigned.emit(list);
    this.checklistSelection.clear();
  }

  onPressCheckAllUnassigned(){
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
      if(!this.checklistSelection.isSelected(this.treeControl.dataNodes[i]) && !this.treeControl.dataNodes[i].assigned) {
        this.checklistSelection.select(this.treeControl.dataNodes[i]);
      }
      this.treeControl.expand(this.treeControl.dataNodes[i])
    }
  }

  onPressUncheckAllUnassigned() {
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
      if(this.checklistSelection.isSelected(this.treeControl.dataNodes[i]) && !this.treeControl.dataNodes[i].assigned) {
        this.checklistSelection.deselect(this.treeControl.dataNodes[i]);
      }
    }
  }

  onPressCheckAllAssigned(){
    for (let i = 0; i < this.treeControlAssigned.dataNodes.length; i++) {
      if(!this.checklistSelectionAssigned.isSelected(this.treeControlAssigned.dataNodes[i]) && this.treeControlAssigned.dataNodes[i].assigned) {
        this.checklistSelectionAssigned.select(this.treeControlAssigned.dataNodes[i]);
      }
      this.treeControlAssigned.expand(this.treeControl.dataNodes[i])
    }
  }

  onPressUncheckAllAssigned() {
    for (let i = 0; i < this.treeControlAssigned.dataNodes.length; i++) {
      if(this.checklistSelectionAssigned.isSelected(this.treeControlAssigned.dataNodes[i]) && this.treeControlAssigned.dataNodes[i].assigned) {
        this.checklistSelectionAssigned.deselect(this.treeControlAssigned.dataNodes[i]);
      }
    }
  }

  allUnassignedAreDisable() {
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
      if(!this.treeControl.dataNodes[i].assigned) {
        return false
      }
    }
    return true
  }

  allAssignedAreDisable() {
    for (let i = 0; i < this.treeControlAssigned.dataNodes.length; i++) {
      if(this.treeControlAssigned.dataNodes[i].assigned) {
        return false
      }
    }
    return true
  }

  someCompleteUnassigned() {
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
      if(this.checklistSelection.isSelected(this.treeControl.dataNodes[i]) && !this.treeControl.dataNodes[i].assigned) {
        return true
      }
    }
    return false
  }

  someCompleteUnassignedParent(node) {
    const descendants = this.treeControl.getDescendants(node);
    for (let i = 0; i < descendants.length; i++) {
      if(this.checklistSelection.isSelected(descendants[i]) && !descendants[i].assigned) {
        return true
      }
    }
    return false
  }

  someCompleteAssigned() {
    for (let i = 0; i < this.treeControlAssigned.dataNodes.length; i++) {
      if(this.checklistSelectionAssigned.isSelected(this.treeControlAssigned.dataNodes[i]) && this.treeControlAssigned.dataNodes[i].assigned) {
        return true
      }
    }
    return false
  }

  allCompleteUnassigned() {
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
      if(!this.checklistSelection.isSelected(this.treeControl.dataNodes[i]) && !this.treeControl.dataNodes[i].assigned) {
        return false
      }
    }
    return true
  }

  allCompleteAssigned() {
    for (let i = 0; i < this.treeControlAssigned.dataNodes.length; i++) {
      if(!this.checklistSelectionAssigned.isSelected(this.treeControlAssigned.dataNodes[i]) && this.treeControlAssigned.dataNodes[i].assigned) {
        return false
      }
    }
    return true
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      let arr = [{
        item: event.item.element.nativeElement.getElementsByClassName('mat-checkbox-label')[0].textContent.trim(),
        assigned: null,
        expandable: null,
        level: null,
      }];
      this.onDrag.emit(arr);
    }
  }

  // collapse
}
