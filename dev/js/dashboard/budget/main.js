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
                    console.log("here i")
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


function create_budget_validation(){
    return true;
}
