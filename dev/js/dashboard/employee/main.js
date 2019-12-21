import { AddEmployee } from './../../api';
import { defaultButton, inprogressButton } from '../../helper/spinnerButton';


$(document).on('click', '#addEmployeeBtn', function(){
    let $this       = $(this),
        first_name  = $('#tabs-icons-manual').find('#firstName').val(),
        last_name   = $('#tabs-icons-manual').find('#lastName').val(),
        email       = $('#tabs-icons-manual').find('#email').val(),
        job_title   = $('#tabs-icons-manual').find('#jobTitle').val();
        // birth_date  = $('#tabs-icons-manual').find("#birthday");
        let params = {
            first_name,
            last_name,
            job_title,
            email
        }
        // ... add loading to button
        inprogressButton($this);
        AddEmployee(
            params,
            (status, res) => {
                if (status) {
                    console.log('added')
                    // ... remove loading button
                    defaultButton($this)
                }
                else {
                    defaultButton($this)
                    // ... remove loading button
                    console.log('error')
                }
            }
        )
})