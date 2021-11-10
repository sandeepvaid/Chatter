{
    //Add comment function
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');
        newCommentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url:'/comment/create',
                data:newCommentForm.serialize(),
                success:function(data){
                   
                    let newComment = newCommentDom(data.data.comment);
                   
              
                    $(`.post-comment-list #post-comments-${data.data.comment.post}`).prepend(newComment);
                    notyShow(data.data.comment.user.name,'success','created');
                    deleteComment($(' .delete-comment-button',newComment));
            
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }



    //Dom manpulation for putting the comment over here
    let newCommentDom = function(comment){
        
        return $(`
                <li id="comment-${comment._id}">
                    <p>
                        <small>
                            <a class="delete-comment-button" href="/comment/destroy/${comment._id}">X</a>
                        </small>

                        ${comment.content}
                        <br>
                        <small>
                            <span>Commented by</span>
                            ${comment.user.name}
                        </small>
                    </p>    
                </li>`)
    }


    //Function to delete the post
    let deleteComment = function(deletelink){
        $(deletelink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url: $(deletelink).prop('href'),
                success:function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    notyShow(data.name,'success','deleted');
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    //function for noty
    let notyShow = function(creator,type,shower){
        if(type == 'success'){
            new Noty({
                theme:'relax',
                text: `${creator} your comment is ${shower}`,
                type:'success',
                layout:'topRight',
                timeout: 1500
            }).show();
        }else{
            new Noty({
                theme:'relax',
                text: `${creator}Something is wrong`,
                type:'error',
                layout:'topRight',
                timeout: 1500
            }).show();
        }
    }



    //Apply delete function to call the comment
    let populate_all_delete=function(){
        console.log("Inside element")
        $('.post-comment-list>ul>li').each(function(){
            let element=$(this);
            console.log(element);
            deleteComment($(' .delete-comment-button',element));
        });
    }
    populate_all_delete();
    createComment();
}