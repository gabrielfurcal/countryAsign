
/*Variable para obtener las tablas configuradas, esta variable debe ser tipo array*/
var dataTables = [];

_fn_implementTableButton(
    [
        {
            name: 'table_countries',
            button: true,
            ajax:{            
                url: location.origin + '/selectAll/countries',
                dataSrc:'' //Manipular la data json, si esta vacio trae toda la data, es obligatorio declararlo
            },
            columns: [{data: 'CountryID', width: '15%'},
                        {data: 'Name', width: '65%'},
                        {width: '10%', defaultContent: '<div class="datatable_btn_accions"><button type="button" class="btn btn-primary table_btn_edit"><i class="fas fa-pen"></i></button><button type="button" class="btn btn-danger table_btn_delete"><i class="fas fa-trash"></i></button></div>'}],
            lengthMenu: 'Showing _MENU_ records',
            sSearch: 'Search',
            zeroRecords: 'NOT FOUND RECORDS',
            info: 'Records from _START_ to _END_ of a total of _TOTAL_',
            infoEmpty: 'Records from 0 to 0 of a total of 0',
            sFirst: 'First',
            sLast: 'Last',
            sNext: 'Next',
            sProcessing: 'Loading',
            sPrevious: 'Previous',
            tittleAttrPDF: 'Export to PDF',
            tittleAttrEXCEL: 'Export to EXCEL',
            tittleAttrPRINT: 'Print'
        }
    ], dataTables
);


/*Operaciones generales*/
if(document.getElementById('main_btns') != undefined) {
    const mainBtns = document.getElementById('main_btns'),
        btnEdit = document.getElementById('btn_edit') != undefined ? document.getElementById('btn_edit') : null,
        btnNew = document.getElementById('btn_new') != undefined ? document.getElementById('btn_new') : null,
        btnCancel = document.getElementById('btn_cancel') != undefined ? document.getElementById('btn_cancel') : null,
        btnSave = document.getElementById('btn_save') != undefined ? document.getElementById('btn_save') : null,
        readOnlyInputs = Array.from(document.getElementsByClassName('disable_input')),
        priorityInputs = Array.from(document.getElementsByClassName('priority')),
        origin = location.origin,
        contTableCountry = document.getElementById('contTableCountry'),
        countryID = document.getElementById('countryID'),
        countryName = document.getElementById('countryName');
    
    var selectedCountry = 0;


    /*Poner Read Only a los inputs*/
    readOnlyState = (read) => {
        if(readOnlyInputs != null)
        {
            for(item of readOnlyInputs) {
                item.readOnly = read;
            }
        }
    }

    /*Validar campos en blanco*/
    validateFields = () => {

        let fields = '';

        for(let i=0; i < priorityInputs.length; i++)
        {   
            let input = document.getElementById(priorityInputs[i].attributes.for.value);
            
            if(input.value <= 0)
            {
                fields += i+1 == priorityInputs.length ? priorityInputs[i].innerHTML.replace(':', '') : priorityInputs[i].innerHTML.replace(':', '') + ', ';
            }
        }

        return fields;
    }

    /*Button EDIT*/
    if (btnEdit != null) {
        btnEdit.addEventListener('click', () => {

            if(selectedCountry > 0 && selectedCountry == parseInt(countryID.value))
            {
                contTableCountry.classList.add('disableDiv');
                btnEdit.classList.add('disable');
                btnNew.classList.add('disable');
                btnCancel.classList.remove('disable');
                btnSave.classList.remove('disable');
                mainBtns.classList.add('edit');
                readOnlyState(false);
            }
        });
    }

    /*Buttoon NEW*/
    if (btnNew != null) {
        btnNew.addEventListener('click', () => {
            contTableCountry.classList.add('disableDiv');
            btnEdit.classList.add('disable');
            btnNew.classList.add('disable');
            btnCancel.classList.remove('disable');
            btnSave.classList.remove('disable');
            mainBtns.classList.add('new');
            readOnlyState(false);

            countryID.value = '';
            countryName.value = '';
        });
    }

    /*Button CANCEL*/
    if (btnCancel != null) {

        btnCancel.classList.add('disable');

        btnCancel.addEventListener('click', () => {

            contTableCountry.classList.remove('disableDiv');
            btnEdit.classList.remove('disable');
            btnNew.classList.remove('disable');
            btnCancel.classList.add('disable');
            btnSave.classList.add('disable');
            mainBtns.classList.remove('new');
            mainBtns.classList.remove('edit');
            readOnlyState(true);
        });
    }

    /*Button SAVE*/
    if (btnSave != null) {

        btnSave.classList.add('disable');

        btnSave.addEventListener('click', () => {

            let blankFields = validateFields();

            if(blankFields.length > 0)
            {
                swal({
                    title: 'Fields in blank',
                    text: blankFields,
                    icon: 'warning',
                  });
            }
            else {

                if (mainBtns.classList.contains('edit')) {
                    $.getJSON(origin + '/update/countries/' + selectedCountry + '/' + countryName.value);
                }
                else if(mainBtns.classList.contains('new')) {
                    $.getJSON(origin + '/insert/countries/' + countryName.value);

                    $.getJSON(origin + '/select/lastCountry', function(result){
                        countryID.value = result.CountryID;
                    });
                }
                
                //Lanzar otra vez la llamada ajax, es decir cargar la data de nuevo
                dataTables[0].ajax.reload();

                contTableCountry.classList.remove('disableDiv');
                btnEdit.classList.remove('disable');
                btnNew.classList.remove('disable');
                btnCancel.classList.add('disable');
                btnSave.classList.add('disable');
                mainBtns.classList.remove('new');
                mainBtns.classList.remove('edit');
                readOnlyState(true);
                
            }
        });
    }

    /*Boton de editar en la tabla*/
    if($('.table_btn_edit') != null) {

        $(document).on('click', '.table_btn_edit', function(){

            row = $(this).parents('tr'); //Seleccionamos la fila completa

            $.getJSON(origin + '/countries/' + row.find('td:eq(0)').text(), //la funcion :eq es para encontrar por index, es decir de menor a menor como este ordenado los hijos de ese contenedor
                function(result) {
                    selectedCountry = result.CountryID;
                    countryID.value = result.CountryID;
                    countryName.value = result.Name;
                });

        });


        $(document).on('dblclick', '.table_btn_edit', function(){
            contTableCountry.classList.add('disableDiv');
            btnEdit.classList.add('disable');
            btnNew.classList.add('disable');
            btnCancel.classList.remove('disable');
            btnSave.classList.remove('disable');
            mainBtns.classList.add('edit');
            readOnlyState(false);
        });


    }

    /*Boton de eliminar en la tabla*/
    if($('.table_btn_delete') != null) {
        
        $(document).on('click', '.table_btn_delete', function(){
            const row = $(this).parents('tr');
            const value = row.find('td:eq(0)').text();

            swal({
                title: 'Are you sure delete the Country (' + value + ') ?',
                text: 'Once deleted, you will not be able to recover this record!',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {

                    $.getJSON(origin + '/delete/countries/' + value);

                    /*1) Invocamos la variable dataTables que es un array que contiene las tablas implementadas con DataTable JS
                      2) Eliminamos la fila y volvermos a dibujar la tabla*/
                    dataTables[0].row(row).remove().draw();
                    
                    swal('Has been removed successfully!', {
                        icon: 'success',
                    });
                }
              });

        });

    }

    readOnlyState(true);

}