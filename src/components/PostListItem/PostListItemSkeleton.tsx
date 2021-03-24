const PostListItemSkeleton: React.FC = () => {
  const background = {
    backgroundColor: '#ececec',
  };

  const text = {
    ...background,
    height: '15px',
    width: '75%',
  };

  const button = {
    ...text,
    width: '5%',
  };

  return (
    <div
      className="w-100 list-group-item d-flex"
      style={{ border: '1px solid #ececec', padding: '22px' }}
    >
      <div style={button} className="mr-3" />
      <div style={text} />
      <div style={button} className="ml-auto" />
    </div>
  );
};

export default PostListItemSkeleton;
