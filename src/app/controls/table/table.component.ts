import { 
    Component, 
    Input, 
    Output, 
    EventEmitter, 
    OnChanges, 
    OnInit, 
    SimpleChanges, 
    NgModule,
    ViewEncapsulation
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { EditableContentModule } from '../editable-content/editable-content.component';
import { PaginationModule } from '../pagination/pagination.component';
import { TableEditingStyle } from '../commons/enums/table-edit-mode.enum';

import { DOMType } from '../commons/enums/dom-type.enum';
import { DataType } from '../commons/enums/data-type.enum';
import { OptionValue } from './../commons/helper.class';

import _ from 'lodash';

export class TableHeaderProperty {
    public id: string;
    public isId: boolean;
    public text: string;
    public isShow: boolean;
    public allowToShort: boolean;
    public shortingIn: string;
    public isShorting: boolean;
    public dataType: any;

    constructor() {
        this.isId = false;
        this.isShow = true;
        this.allowToShort = true;
        this.isShorting = false;
        this.shortingIn = 'asc';
        this.text = '';
        this.dataType = DataType.STRING;
    }
}

export class TableRowProperty {
    public onEdit: boolean;
    public data: any;
    public edited: boolean;
    public deleted: boolean;

    constructor() {
        this.onEdit = false;
        this.data = undefined;
        this.edited = false;
        this.deleted = false;
    }
}

@Component({
    selector: 'aw-table',
    styleUrls: ['./table.component.scss'],
    templateUrl: './table.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, OnChanges {
    
    dataValue: Array<any>;
    
    dataChange = new EventEmitter(); 

    rows: Array<TableRowProperty>;

    columnId: any;

    @Input() isLazy = false;

    @Input() headers: Array<TableHeaderProperty>;
    @Input() capitalHeader = false;

    @Input() tableEditingStyle = TableEditingStyle.EXTRA_COLUMN;

    @Input() editable = false;
    
    @Input() pagination = false;
    @Input() itemsPerPage = 5;
    @Input() itemPerPageValues = [
      { value: 5, text: '5'},
      { value: 10, text: '10'},
      { value: 20, text: '20'},
      { value: 30, text: '30'},
      { value: 40, text: '40'}
    ];

    currentPage = 1;
    itemsTotal: number;
    
    @Input()
    get data() {
        return this.dataValue;
    }
    set data(value) {
        this.dataValue = value;
        this.dataChange.emit(this.dataValue);
    }
    
    constructor() {
        this.headers = new Array<TableHeaderProperty>();
        this.rows = new Array<TableRowProperty>();
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data) {
            if (this.headers.length === 0) {
                this.generateHeaders();
            }

            this.generateData();
        }
    }
    
    ngOnInit(): void {
    }
    
    generateHeaders() {
        console.log(this.headers);
        const props = Object.keys(this.dataValue[0]);

        props.forEach(prop => {
            const column = new TableHeaderProperty();
            column.text = prop;
            this.headers.push(column);
        });

        const columnAsId = this.headers.find(x => x.isId);

        this.columnId = (columnAsId) ? columnAsId.text : this.headers[0].text;
    }   

    generateData() {
        this.rows = [];
        if (this.pagination) {
            const start = (Number(this.currentPage) - 1) * Number(this.itemsPerPage);
            const end = Number(start) + Number(this.itemsPerPage);
            _.slice(this.dataValue, start, end).forEach(data => {
                const row = new TableRowProperty();
                row.data = data;
                this.rows.push(row);
            });
        } else {
            this.dataValue.forEach(data => {
                const row = new TableRowProperty();
                row.data = data;
                this.rows.push(row);
            });
        }
        this.itemsTotal = this.dataValue.length;
    }

    onShort(header: TableHeaderProperty) {
        const previouseShorting = this.headers.find(x => x.isShorting);        
        if (previouseShorting && previouseShorting !== header) {
            previouseShorting.shortingIn = 'asc';
            previouseShorting.isShorting = false;
        }

        header.isShorting = !header.isShorting;
        header.shortingIn = (header.shortingIn === 'asc') ? 'desc' : 'asc';
        
        this.dataValue = _.orderBy(this.dataValue, header.id, header.shortingIn);

        this.generateData();
    }

    editButtonClicked(row: TableRowProperty) {
        row.onEdit ? row.onEdit = false : this.editingStyleChanged(row);
    }

    deleteButtonClicked(row: TableRowProperty) {
        row.deleted = true;
    }

    onRowClick(row: TableRowProperty) {
        if (this.tableEditingStyle === 0) return;
        this.editingStyleChanged(row);
    }

    onRowDoubleClick(row: TableRowProperty) {
        if (this.tableEditingStyle === 0) return;
        row.onEdit = false;
    }

    editingStyleChanged(row) {
        this.clearRowEditing();
        row.onEdit = !row.onEdit;    
    }

    clearRowEditing() {
        const lastSelectedRow = this.rows.find(x => x.onEdit === true);
        if (lastSelectedRow) lastSelectedRow.onEdit = false;
    }

    refreshPage($event) {
        if (!this.pagination) return;
        this.itemsPerPage = $event.itemsPerPage;
        this.currentPage = $event.currentPage;
        this.generateData();
        
    }

    onPrev($event) {
        this.refreshPage($event);
    }

    onNext($event) {
        this.refreshPage($event);
    }

    onFirst($event) {
        this.refreshPage($event);
    }

    onLast($event) {
        this.refreshPage($event);
    }

    onItemsPerPageChanged($event) {
        this.refreshPage($event);
    }
}

@NgModule({
    imports: [CommonModule, EditableContentModule, PaginationModule],
    exports: [TableComponent],
    declarations: [TableComponent]
})
export class TableModule { }
