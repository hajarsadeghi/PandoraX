const API = require("../../api");

get_budget_list()

$("#create_budget_submit").click(function(){
    if (create_budget_validation()){
        let params = {
            name:$("#budgetName").val(),
            point_amount:$("#budgetPoints").val()
        }
        API.create_budget(
            '/api/budget/',
            params,
            (status, res) => {
                if (status) {
                    get_budget_list();
                    $("#budgetModal").modal('hide');
                }
                else {
                    console.log('error')
                }
            }
        )
    }
})

function get_budget_list(){
    API.get_created_budget(
        '/api/budget/',
        null,
        (status, res) => {
            console.log(status,res)
            if (status) {
                sibs = $("#created_budget_list_keeper .source").siblings(".table-body");
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
                        element.css("display","flex");
                        element.find("span").text(res[i].name);
                        element.find("small").text("Created by "+res[i].creator.full_name);
                        element.find("div[type='points']").text(res[i].point_amount);
                        element.find("div[type='date']").text(date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate());
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


$('#budgetModal').on('hide.bs.modal', function (e) {
    $("#budgetName").val("")
    $("#budgetPoints").val("")
})

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
        amount_error.text(gettext("Please enter budget name!"));
        amount_error.css("display","block");
        $("#budgetPoints").addClass("error-field");
        $("#budgetPoints").keyup(function(){
            amount_error.css("display","none");
            $("#budgetPoints").removeClass("error-field");
        })
    }
    return is_valid;
}
