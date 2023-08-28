import "./Container.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {TextArea} from "./compareText"


export const Container = () => {

  return (

    <div className="container">
      <div className="row">
        <div className="x1 col-md-4">
          <div className="box">
            <TextArea/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
