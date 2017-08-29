json.index do
  @comments.each do |comment|
    json.set! comment.id do
      json.partial! 'api/comments/comment', comment: comment
      json.commenter comment.commenter.username
    end
  end
end

json.ord @comments.map(&:id)
