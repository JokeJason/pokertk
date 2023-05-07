import './GenderRate.css';

export interface GenderRateProps {
  genderRatio: number;
}

const GenderRate = ({ genderRatio }: GenderRateProps) => {
  switch (genderRatio) {
    case 0:
      return (
        <div>
          <span className="gender-male">
            100% <i className="fa fa-mars">♂</i>
          </span>
          <span>
            {' '}
            0% <i className="fa fa-venus">♀</i>
          </span>
        </div>
      );
    case 1:
      return (
        <div>
          <span>
            87.5% <i className="fa fa-mars">♂</i>
          </span>
          <span>
            {' '}
            12.5% <i className="fa fa-venus">♀</i>
          </span>
        </div>
      );
    case 2:
      return (
        <div>
          <span>
            75% <i className="fa fa-mars">♂</i>
          </span>
          <span>
            {' '}
            25% <i className="fa fa-venus">♀</i>
          </span>
        </div>
      );
    case 3:
      return (
        <div>
          <span>
            62.5% <i className="fa fa-mars">♂</i>
          </span>
          <span>
            {' '}
            37.5% <i className="fa fa-venus">♀</i>
          </span>
        </div>
      );
    case 4:
      return (
        <div>
          <span>
            50% <i className="fa fa-mars">♂</i>
          </span>
          <span>
            {' '}
            50% <i className="fa fa-venus">♀</i>
          </span>
        </div>
      );
    case 5:
      return (
        <div>
          <span>
            37.5% <i className="fa fa-mars">♂</i>
          </span>
          <span>
            {' '}
            62.5% <i className="fa fa-venus">♀</i>
          </span>
        </div>
      );
    case 6:
      return (
        <div>
          <span>
            25% <i className="fa fa-mars">♂</i>
          </span>
          <span>
            {' '}
            75% <i className="fa fa-venus">♀</i>
          </span>
        </div>
      );
    case 7:
      return (
        <div>
          <span>
            12.5% <i className="fa fa-mars">♂</i>
          </span>
          <span>
            {' '}
            87.5% <i className="fa fa-venus"></i>
          </span>
        </div>
      );
    case 8:
      return (
        <div>
          <span>
            0% <i className="fa fa-mars">♂</i>
          </span>
          <span>
            {' '}
            100% <i className="fa fa-venus"></i>
          </span>
        </div>
      );
    default:
      return <span>Loading...</span>;
  }
};

export default GenderRate;
