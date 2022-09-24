import React from 'react';
import { useState, useEffect } from 'react';
import add_image from '../../assets/images/add.svg';
import { catalogService } from '../../services';
import './styles.scss';

export function CatalogPage() {
  const [catalogs, setCatalogs] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    loadCatalogs();
  }, []);

  function loadCatalogs() {
    catalogService.getAll()
      .then((data) => {
        setCatalogs(data.data);
      })
      .catch((error) => {
        //setError(error);
      })
      .finally(() => {
        //setLoading(false);
      });
  }

  return (
    <>
    <section className="esh-catalog-filters">
      <div className="container">
      </div>
    </section>
    <div className="container">
      <div className="esh-catalog-items row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            { catalogs.length > 0 && catalogs.map((item, index) => (
              <div>
                <div key={index} className="esh-catalog-thumbnail-wrapper">
                    <div className="esh-catalog-thumbnail-icon d-flex justify-content-center">
                      <img className="esh-catalog-thumbnail-icon-svg" src={add_image} alt="add"/>
                    </div>
                    {/* <img className="esh-catalog-thumbnail" src="{{item.pictureUri}}" /> */}
                </div>
                <div className="esh-catalog-details d-flex justify-content-between align-items-center">
                    <div className="esh-catalog-name ml-3">
                        <span></span>
                    </div>
                    <div className="esh-catalog-price mr-3">
                        <span></span>
                    </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>

    {
      loading && (
        <div>Loading ...</div>
      )
    }

    {
      error && (
        <div>Error: something wrong </div>
      )
    }
    </>
  )
}
