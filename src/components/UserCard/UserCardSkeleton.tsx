const UserCardSkeleton: React.FC = () => (
  <div className="w-100 skeleton__user-wrapper">
    <div className="skeleton__user-header" />
    <div className="d-flex flex-column flex-grow-1 p-4">
      <div className="mb-2 skeleton__user-text" />
      <div className="mb-2 skeleton__user-text" />
      <div className="mb-5 skeleton__user-text" />
      <div className="mb-2 skeleton__user-text" />
      <div className="mb-2 skeleton__user-text" />
      <div className="mb-5 skeleton__user-text" />
      <div className="skeleton__user-button" />
    </div>
  </div>
);

export default UserCardSkeleton;
