import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useState, useEffect } from 'react';
import add_image from '../../assets/images/add.svg';
import { ICatalogItem } from '../../interfaces/ICatalogItem';
import { catalogService } from '../../services';
import './styles.scss';

export function CatalogPage() {
  const [catalogs, setCatalogs] = useState<ICatalogItem[]>([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState<boolean>();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    loadCatalogs();
  }, []);

  function loadCatalogs() {
    catalogService.getAll()
      .then((data) => {
        setCatalogs(data.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function addToCart(item: ICatalogItem) 
  {
    if(isAuthenticated) {
      console.log("add cart", item);
    }
  }

  return (
    <>
    <section className="esh-catalog-filters">
      <div className="container">
      </div>
    </section>
    <div className="container">
      <div className="esh-catalog-items row">
        { catalogs.length > 0 && catalogs.map((item, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className={"esh-catalog-item + (!isAuthenticated? is-disabled)"} onClick={() => addToCart(item)} >  
              <div className="esh-catalog-thumbnail-wrapper">
                  <div className="esh-catalog-thumbnail-icon d-flex justify-content-center">
                    <img className="esh-catalog-thumbnail-icon-svg" src={add_image} alt="add"/>
                  </div>
                  {/* <img className="esh-catalog-thumbnail" src="{{item.pictureUri}}" /> */}
              </div>
              <div className="esh-catalog-details d-flex justify-content-between align-items-center">
                  <div className="esh-catalog-name ml-3">
                      <span>{item.name}</span>
                  </div>
                  <div className="esh-catalog-price mr-3">
                      <span>{item.price}</span>
                  </div>
              </div>
            </div>
          </div>
        ))}
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
