{
    //Method to submit the form data for new post using Ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        // console.log(newPostForm)
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url:'/post/create',
                data:newPostForm.serialize(),
                success:function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    notyShow(data.name,'success','created');
              
                    $('#post-list-container > ul').prepend(newPost);
               
                    deletePost($(' .delete-post-button',newPost));
               
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //Method to create a post in Dom
    let newPostDom = function(post){
        console.log(post.user.name);
        return $(`
                <li id="post-${post._id}">
                    <p>
                        <small>
                            <a class="delete-post-button" href="/post/destroy/${post._id}">X</a>
                        </small>
  
                        ${post.content}
                        <br>
                        <small>
                            <h5>  Created by  ${post.user.name}</h5>
                        </small>
                    </p>
                    <div class="post-comments">
                        
                        <form action="/comment/create" method="post">
                        
                            <input type="text" name="content" placeholder="Type here to add comment ...." required>
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add comment">
            
                        </form>
                
                    
                        <div class="post-comment-list">
                            <ul id="post-comments-${post._id}">
                                
                            </ul>
                        </div>
                    </div>
                
                </li>`
                    )
    }


    //Function to delete the post
    let deletePost = function(deletelink){
        $(deletelink).click(function(e){
            e.preventDefault();
            console.log("Am the delete post")
            $.ajax({
                type:'get',
                url: $(deletelink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    notyShow(data.name,'success','deleted');
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    let populate_all_delete=function(){
        console.log("Inside element")
        $('#post-list-container>ul>li').each(function(){
            let element=$(this);
            console.log(element);
            deletePost($(' .delete-post-button',element));

           
        });
    }

    //function for noty
    let notyShow = function(creator,type,shower){
        if(type == 'success'){
            new Noty({
                theme:'relax',
                text: `${creator} your post is ${shower}`,
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

    populate_all_delete();
    createPost();
}













