const Filter = (props) =>
{
  return (
    <div className="filter">
      <h5>{props.title}</h5>
      <div className="customCheckBoxHolder">
        <input className="customCheckBoxInput" id="cCB1" type="checkbox" />
        <label className="customCheckBoxWrapper">
          <div className="customCheckBox">
            <div className="inner">{props.option1}</div>
          </div>
        </label>

        <input className="customCheckBoxInput" id="cCB2" type="checkbox" />
        <label className="customCheckBoxWrapper">
          <div className="customCheckBox">
            <div className="inner">{props.option2}</div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Filter;
