import { postComment } from './../../api';



$(document).ready(function() {
    $(document).on('keyup change', '.comment-content', function(e) {
        let $this = $(this),
            $activityId = $this.closest('.comment-row').attr('index'),
            $elemId = $($this.siblings('textarea.comment-content')).attr('id'),
            $text = $($('#' + $elemId)[0]).siblings('div.textarea-control').text();
            // console.log($($('#' + $id)[0]).siblings('div.textarea-control').html().replace(/<\/div>/g,"\n"))
        if (e.code === 'Enter') {
            postComment(
                $activityId,{
                text: $text
            },(status, response) => {
                if (status) {
                    $($('#' + $elemId)[0]).siblings('div.textarea-control').html('')
                    console.log(response,'response')
                }
            })
        }
    })  
})