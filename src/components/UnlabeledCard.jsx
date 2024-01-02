const UnlabeledCard = ({ id, image_url, image_name }) => {
  return (
    <div className="card w-[250px] bg-base-200 shadow-xl">
      <figure>
        <img src={image_url} alt="image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <span className="truncate">{id}</span>

          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p className="truncate">{image_name}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Image</div>
          <div className="badge badge-outline">Unlabeled</div>
        </div>
      </div>
    </div>
  );
};

export default UnlabeledCard;
