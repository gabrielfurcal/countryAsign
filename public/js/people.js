
var dataTables = [];

_fn_implementTableButton(
    [
        {
            name: 'table_people',
            button: true,
            ajax:{            
                url: location.origin + '/selectAll/people/resume',
                dataSrc:''
            },
            columns: [{data: 'PeopleID', width: '10%'},
                      {data: 'FullName', width: '50%'},
                      {data: 'Email', width: '25%'},
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
        }/*,
        {
            name: 'table_countries',
            button: false,
            ajax:{            
                url: location.origin + '/selectAll/countries',
                dataSrc:''
            },
            columns: [{data: 'CountryID', width: '15%'},
                      {data: 'Name', width: '90%'}],
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
        }*/
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
        disableSelects = Array.from(document.getElementsByClassName('disable_select')),
        priorityInputs = Array.from(document.getElementsByClassName('priority')),
        contTablePeople = document.getElementById('contTablePeople'),
        searchCountry = document.getElementById('searchCountry');
        origin = location.origin,
        peopleID = document.getElementById('peopleID'),
        peopleName = document.getElementById('peopleName'),
        peopleLastName = document.getElementById('peopleLastName'),
        peopleAge = document.getElementById('peopleAge'),
        peopleSex = document.getElementById('peopleSex'),
        peopleEmail = document.getElementById('peopleEmail'),
        countryID = document.getElementById('countryID');

    var selectedPeople = 0;

    countryIDSearch = () => {
        $.getJSON(origin + '/countries/' + countryID.value)
        .done(function(result) {
            countryIDName.value = result.Name;
        })
        .fail(function(error) {
            countryIDName.value = '';
        });
    }

    readOnlyState = (read) => {
        if(readOnlyInputs != null)
        {
            for(item of readOnlyInputs) {
                item.readOnly = read;
            }
        }

        if(disableSelects != null)
        {
            for(item of disableSelects) {
                item.disabled = read;
            }
        }
    }

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

            if(selectedPeople > 0 && selectedPeople == parseInt(peopleID.value))
            {
                contTablePeople.classList.add('disableDiv');
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
            contTablePeople.classList.add('disableDiv');
            btnEdit.classList.add('disable');
            btnNew.classList.add('disable');
            btnCancel.classList.remove('disable');
            btnSave.classList.remove('disable');
            mainBtns.classList.add('new');
            readOnlyState(false);

            peopleID.value = '';
            peopleName.value = '';
            peopleLastName.value = '';
            peopleAge.value = '';
            peopleSex.value = '';
            peopleEmail.value = '';
            countryID.value = '';
            countryID.keydown;
        });
    }

    /*Button CANCEL*/
    if (btnCancel != null) {

        btnCancel.classList.add('disable');

        btnCancel.addEventListener('click', () => {

            contTablePeople.classList.remove('disableDiv');
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
                    $.getJSON(origin + '/update/people/' + selectedPeople + '/' + peopleName.value + '/' + peopleLastName.value + '/' + peopleAge.value + '/' + peopleSex.value + '/' + peopleEmail.value + '/' + countryID.value);
                }
                else if(mainBtns.classList.contains('new')) {
                    $.getJSON(origin + '/insert/people/' + peopleName.value + '/' + peopleLastName.value + '/' + peopleAge.value + '/' + peopleSex.value + '/' + peopleEmail.value + '/' + countryID.value);

                    $.getJSON(origin + '/select/lastPeople', function(result){
                        peopleID.value = result.PeopleID;
                    });
                }

                dataTables[0].ajax.reload();

                contTablePeople.classList.remove('disableDiv');
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

            $.getJSON(origin + '/people/' + row.find('td:eq(0)').text(), //la funcion :eq es para encontrar por index, es decir de menor a menor como este ordenado los hijos de ese contenedor
                function(result) {
                    selectedPeople = result.PeopleID;
                    peopleID.value = result.PeopleID;
                    peopleName.value = result.Name;
                    peopleLastName.value = result.LastName;
                    peopleAge.value = result.Age;
                    peopleSex.value = result.Sex;
                    peopleEmail.value = result.Email;
                    countryID.value = result.CountryID;
                    countryIDSearch();
                });

        });


        $(document).on('dblclick', '.table_btn_edit', function(){
            contTablePeople.classList.add('disableDiv');
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
                title: 'Are you sure delete the People (' + value + ') ?',
                text: 'Once deleted, you will not be able to recover this record!',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {

                    $.getJSON(origin + '/delete/people/' + value);

                    dataTables[0].row(row).remove().draw();
                    
                    swal('Has been removed successfully!', {
                        icon: 'success',
                    });
                }
              });

        });

    }


    /*Validar los buscadores*/
    countryID.addEventListener('keyup', (e) => {
        if(!e.target.readOnly && e.key == 'Enter') {
            countryIDSearch();
        }
    });

    countryID.addEventListener('blur', (e) => {
        if(!e.target.readOnly) {
            countryIDSearch();
        }
    });

    readOnlyState(true);

}