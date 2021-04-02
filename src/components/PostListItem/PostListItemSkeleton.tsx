const PostListItemSkeleton: React.FC = () => (
  <div className="w-100 list-group-item d-flex skeleton__post-wrapper">
    <div className="mr-3 skeleton__post-button" />
    <div className="skeleton__post-text" />
    <div className="ml-auto skeleton__post-button" />
  </div>
);

export default PostListItemSkeleton;
