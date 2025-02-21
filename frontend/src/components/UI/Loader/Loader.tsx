const Loader = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-grow" style={{color: '#4389cc'}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;