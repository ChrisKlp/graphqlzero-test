const PostSkeleton: React.FC = () => {
  const background = {
    backgroundColor: '#ececec',
  };

  const text = {
    ...background,
    marginBottom: '10px',
    height: '15px',
    width: '100%',
  };

  const header = {
    ...background,
    height: '30px',
    width: '75%',
  };

  return (
    <div className="my-5" data-testid="loading">
      <div style={header} className="mb-5" />
      <div style={text} />
      <div style={text} />
      <div style={text} />
      <div style={text} />
      <div style={text} />
    </div>
  );
};

export default PostSkeleton;
