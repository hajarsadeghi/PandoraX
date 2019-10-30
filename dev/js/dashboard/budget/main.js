import { getCreatedBudget } from '../../api';

get_budget_list()

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
            console.log(status,res)
            if (status) {
                sibs = $("#created_budget_list_keeper .source").siblings();
                for (let i=0;i<sibs.length;i++){
                    sibs[i].remove();
                }
                if (res.length>0){
                    $("#created_budget_list_keeper").css("display","block");
                    $("#no_budget_animation").css("display","none");
                    $(".no-budget-desc").css("display","none");
                    for (let i=0;i<res.length;i++){
                        let date = new Date(res[i].created_date);
                        let element = $("#created_budget_list_keeper .source").clone();
                        element.removeClass("source");
                        element.css("display","table-row");
                        if (!res[i].active){
                            element.css("background-color","rgba(255,255,255,0.35)");
                            element.css("background-color","rgb(224,224,224)");
                            element.find("td[type='status'] i").text("cancel").css("color","#63636354");
                        }else{
                            element.find("td[type='status'] i").text("check_circle").css("color","#63636354");
                        }
                        element.find("span").text(res[i].name);
                        element.find("small").text("Created by "+res[i].creator.full_name);
                        element.find("td[type='points']").text(res[i].point_amount);
                        element.find("td[type='date']").text(date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate());
                        element.insertAfter($("#created_budget_list_keeper .source"))
                    }
                }else{
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
