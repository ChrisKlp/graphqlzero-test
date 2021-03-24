const UserCardSkeleton: React.FC = () => {
  const background = {
    backgroundColor: '#ececec',
  };

  const text = {
    ...background,
    height: '15px',
  };

  const header = {
    ...background,
    height: '53px',
  };

  const button = {
    ...background,
    height: '38px',
  };

  return (
    <div className="w-100" style={{ border: '1px solid #ececec' }}>
      <div style={header} />
      <div className="d-flex flex-column flex-grow-1 p-4">
        <div className="mb-2" style={text} />
        <div className="mb-2" style={text} />
        <div className="mb-5" style={text} />
        <div className="mb-2" style={text} />
        <div className="mb-2" style={text} />
        <div className="mb-5" style={text} />
        <div style={button} />
      </div>
    </div>
  );
};

export default UserCardSkeleton;
