/*
    Este script genera tablas en conjunto con tres botones (PDF, EXCEL, PRINT), las variables fueron denominadas
    según el nombre de las misma en la libreria DataTable JS. A continuación como debe de utilizarse.

    1) Se declara una variable que servirá de base, esta debe de ser un Array de objetos

    2) Lo que debe de conteneder, sino se le asigna un valor por defecto:
        
        var varibale = 
            [
                {
                    name: El id de la tabla a la que se le efectuará el proceso
                    columns: Array de objetos para declarar el tamaño de las columnas
                    paging: Habilitar paginación
                    scrollY: Habilitar scroll en Y
                    scrollX: Habilitar scroll en X
                    lengthMenu: Filtro según cantidad
                    zeroRecords: Mensaje cuando no haya filas
                    info: Información extra
                    infoEmpty: Información extra en caso de no haber filas
                    sSearch: Texto del campo busqueda
                    sFirst: Texto del botón que va a la primera paginación
                    sLast: Texto del botón que va a la ultima paginación
                    sNext: Texto del botón que va a la siguiente paginación
                    sPrevious: Texto del botón que va a la anterior paginación
                    sProcessing: Mensaje cuando se esten cargando las filas
                    dom: Demine como se alinearan los objetos
                    textPDF: Contenido del botón PDF
                    tittleAttrPDF: Información extra del botón PDF
                    classNamePDF: Clase del botón PDF
                    textEXCEL: Contenido del botón EXCEL
                    tittleAttrEXCEL: Información extra del botón EXCEL
                    classNameEXCEL: Clase del botón EXCEL
                    textPRINT: Contenido del botón PRINT
                    tittleAttrPRINT: Información extra del botón PRINT
                    classNamePRINT: Clase del botón PRINT
                }
            ]

*/

_fn_implementTableButton = (tableArray, tables) => {

    if(tableArray.length > 0) {
        for(let item of tableArray)
        {
            $(document).ready(function() {

                let dataTable = {
                    //Para mostrar la paginacion
                    paging: item.paging = item.paging == undefined ? true : item.paging,
                    //Configurar textos
                    language: {
                        //Para filtrar X cantidad de articulos
                        'lengthMenu': item.lengthMenu = item.lengthMenu == undefined ? 'Mostrar _MENU_ registros' : item.lengthMenu, 
                        //Cuando no haya ni una fila en el tbody que no coincidan con el filtro
                        'zeroRecords': item.zeroRecords = item.zeroRecords == undefined ? '** NO SE ENCONTRARON REGISTROS **' : item.zeroRecords,
                        //Información extra que aparece debajo de la tabla
                        'info': item.info = item.info == undefined ? 'Registros del _START_ al _END_ de un total de _TOTAL_'  : item.info,
                        //Información extra cuando no haya filas
                        'infoEmpty': item.infoEmpty = item.infoEmpty == undefined ? 'Registros del 0 al 0 de un total de 0' : item.infoEmpty,
                        //Cambiar texto que aparece al lado izquiero del campo buscar
                        'sSearch': item.sSearch = item.sSearch == undefined ? 'Buscar' : item.sSearch,
                        //Cambiar el texto de la paginación
                        'oPaginate': {
                            'sFirst': item.sFirst = item.sFirst == undefined ? 'Primero' : item.sFirst,
                            'sLast': item.sLast = item.sLast == undefined ? 'Último' : item.sLast,
                            'sNext': item.sNext = item.sNext == undefined ? 'Siguiente' : item.sNext,
                            'sPrevious': item.sPrevious = item.sPrevious == undefined ? 'Anterior' : item.sPrevious
                        },
                        //Cuando este cargando las filas
                        'sProcessing': item.sProcessing = item.sProcessing == undefined ? 'Cargando...' : item.sProcessing
                    },
                    //Para utilizar los bótones
                    responsive: 'true'
                }

                if(item.ajax != undefined) //Para obtener data de un json
                {
                    Object.defineProperty(dataTable, 'ajax', {
                        value: item.ajax,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                }

                if(item.data != undefined)
                {
                    Object.defineProperty(dataTable, 'data', {
                        value: item.data,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                }

                if(item.button == true) {

                    //El 'dom' sirve para alinear los objetos segun el orden de letra, en este caso se agrupan dentro de un div o contenedor
                    Object.defineProperty(dataTable, 'dom', {
                        value: item.dom = item.dom == undefined ? '<"top"lBf><"bottom"rt><"clear"ip>' : item.dom,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(dataTable, 'buttons', {
                        value: [
                            {//Button PDF
                                extend: 'pdfHtml5',
                                text: item.textPDF = item.textPDF == undefined ? '<i class="fas fa-file-pdf"></i>' : item.textPDF,
                                tittleAttr: item.tittleAttrPDF = item.tittleAttrPDF == undefined ? 'Exportar a PDF' : item.tittleAttrPDF,
                                className: item.classNamePDF = item.classNamePDF == undefined ? 'btn btn-danger ' + item.name + '_btn_group ' + item.name + '_btn_pdf' : item.classNamePDF
                            },
                            {//Button EXCEL
                                extend: 'excelHtml5',
                                text: item.textEXCEL = item.textEXCEL == undefined ? '<i class="fas fa-file-excel"></i>' : item.textEXCEL,
                                tittleAttr: item.tittleAttrEXCEL = item.tittleAttrEXCEL == undefined ? 'Exportar a EXCEL' : item.tittleAttrEXCEL,
                                className: item.classNameEXCEL = item.classNameEXCEL == undefined ? 'btn btn-success ' + item.name + '_btn_group ' + item.name + '_btn_excel' : item.classNameEXCEL
                            },
                            {//Button IMPRIMIR
                                extend: 'print',
                                text: item.textPRINT = item.textPRINT == undefined ? '<i class="fas fa-print"></i>' : item.textPRINT,
                                tittleAttr: item.tittleAttrPRINT = item.tittleAttrPRINT == undefined ? 'Imprimir' : item.tittleAttrPRINT,
                                className: item.classNamePRINT = item.classNamePRINT == undefined ? 'btn btn-info ' + item.name + '_btn_group ' + item.name + '_btn_print' : item.classNamePRINT
                            }
                        ],
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                }
                else {
                    Object.defineProperty(dataTable, 'dom', {
                        value: item.dom = item.dom == undefined ? '<"top"lf><"bottom"rt><"clear"ip>' : item.dom,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                }

                if(item.columns != undefined) //Para definir taño de las columnas
                {
                    //Para poder añadir un atributo al objeto
                    Object.defineProperty(dataTable, 'columns', {
                        value: item.columns,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                }

                
                if(item.scrollY != undefined) //Para mostrar scroll en Y
                {
                    Object.defineProperty(dataTable, 'scrollY', {
                        value: item.scrollY,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                }

                if(item.scrollX != undefined) //Para mostrar scroll en X
                {
                    Object.defineProperty(dataTable, 'scrollX', {
                        value: item.scrollX,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                }

                tables.push($('#'+item.name).DataTable(dataTable));
            } );
        }
    }

}