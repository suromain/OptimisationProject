import {isRouteErrorResponse, useRouteError} from "react-router-dom";
// import "../styles/error.scss";

export default function Error() {
  const error = useRouteError();

  return (
    <div className="errorPage">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {
          isRouteErrorResponse(error) ?
            (
              // note that error is type `ErrorResponse`
              <i>{error.statusText || error.data}</i>
            ) :
            'Unknown error message'
        }
      </p>
    </div>
  );
}