const API = require("../../api");

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
                    $("#budgetModal").modal('hide')
                }
                else {
                    console.log('error')
                }
            }
        )
    }
})


API.get_created_budget(
    '/api/budget/',
    null,
    (status, res) => {
        if (status) {
            for (let i=0;i<res.length;i++){
                let element = $("#created_budget_list_keeper .source").clone();
                element.removeClass("source");
                element.css("display","flex");
                element.find("span").text(res[i].name);
                element.find("small").text("Created by "+res[i].creator.full_name);
                element.find("div[type='points']").text(res[i].point_amount);
                element.insertAfter($("#created_budget_list_keeper .source"))
            }
        }
        else {
            console.log('error')
        }
    }
)


function create_budget_validation(){
    return true;
}