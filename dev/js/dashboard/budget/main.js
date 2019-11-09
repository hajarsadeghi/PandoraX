import { getCreatedBudget, createBudget } from '../../api';

$(document).ready(function() {
    get_budget_list()
})

$("#create_budget_submit").click(function(){
    if (create_budget_validation()){
        let params = {
            name:$("#budgetName").val(),
            point_amount:$("#budgetPoints").val()
        }
        createBudget(
            '/api/budget/',
            params,
            (status, res) => {
                if (status) {
                    get_budget_list();
                    $("#addBudgetCollapse").collapse('hide');
                }
                else {
                    console.log('error')
                }
            }
        )
    }
})

function get_budget_list(){
    getCreatedBudget(
        '/api/budget/',
        null,
        (status, res) => {
            if (status) {
                $("#created_budget_list_keeper").find('tbody').empty();
                if (res.length > 0) {
                    $('#created_budget_list_keeper').removeClass('d-none');
                    for (let i = 0; i < res.length; i++) {
                        let date = new Date(res[i].created_date),
                            material_icons = res[i].active ? 'check_circle' : 'cancel';
                        $("#created_budget_list_keeper").find('tbody').append(
                            '<tr>' +
                                '<th>' +
                                    '<span>'+ res[i].name +'</span>' +
                                    '<small class="d-block text-muted">"Created by "'+ res[i].creator.full_name +'"</small>' +
                                '</th>' +
                                '<td >all</td>' +
                                '<td type="points">' +
                                    res[i].point_amount +
                                '</td>' +
                                '<td type="date" >' +
                                    date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate() +
                                '</td>' +
                                '<td type="status" >' +
                                    '<i class="material-icons">'+ material_icons +'</i>' +
                                '</td>' +
                            '</tr>'
                        )
                    }
                }
                else {
                    $("#no_budget_animation").css("display","block");
                    $(".no-budget-desc").css("display","block");
                    lottie.loadAnimation({
                        container: document.getElementById('no_budget_animation'),
                        path: no_budget_anim,
                        renderer: 'svg',
                        autoplay: true,
                        loop: true
                    });
                }

            }
            else {
                console.log('error')
            }
        }
    )
}


$('#addBudgetCollapse').on('hidden.bs.collapse', function (e) {
    if ($("#created_budget_list_keeper").css("display")=="none"){
        $("#no_budget_animation").css("display","block");
        $(".no-budget-desc").css("display","block");  
    }
    $("#budgetName").val("")
    $("#budgetPoints").val("");
    $("#budgetName").siblings(".text-danger").css("display","none");
    $("#budgetName").removeClass("error-field");
    $("#budgetPoints").siblings(".text-danger").css("display","none");
    $("#budgetPoints").removeClass("error-field");
    $("#addBudgetForm i.material-icons").text("add_circle_outline");
})

$('#addBudgetCollapse').on('shown.bs.collapse', function (e) {
    $("#no_budget_animation").css("display","none");
    $(".no-budget-desc").css("display","none");  
    $("#addBudgetForm i.material-icons").text("remove_circle_outline");  
});

function create_budget_validation(){
    let is_valid = true;
    let name = $("#budgetName").val();
    let point_amount = Number($("#budgetPoints").val());
    let name_error = $("#budgetName").siblings(".text-danger");
    let amount_error = $("#budgetPoints").siblings(".text-danger");
    if (name.length < 1){
        is_valid = false;
        name_error.text(gettext("Please enter budget name!"));
        name_error.css("display","block");
        $("#budgetName").addClass("error-field");
        $("#budgetName").keyup(function(){
            name_error.css("display","none");
            $("#budgetName").removeClass("error-field");
        })
    }
    if (point_amount < 1){
        is_valid = false;
        amount_error.text(gettext("Please enter positive point amount!"));
        amount_error.css("display","block");
        $("#budgetPoints").addClass("error-field");
        $("#budgetPoints").keyup(function(){
            amount_error.css("display","none");
            $("#budgetPoints").removeClass("error-field");
        })
    }
    return is_valid;
}
