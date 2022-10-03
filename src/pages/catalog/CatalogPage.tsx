import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { apiService } from '../../utils/api';
import add_image from '../../assets/images/add.svg';
import { ICatalogItem } from '@interfaces/ICatalogItem';
import { IBasket,  } from '@interfaces/IBasket';
import { IBasketItem } from '@interfaces/IBasketItem';
import './styles.scss';

export function CatalogPage() {
  const [catalogs, setCatalogs] = useState<ICatalogItem[]>([]);
  const [basketItems, setBasketItems] = useState<IBasketItem[]>([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState<boolean>();
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    loadCatalogs();
  }, []);

  function loadCatalogs() {
    const catalogAPI = process.env.REACT_APP_CATALOG_API + '/Catalog/items?pageSize=12&pageIndex=0';

    apiService.getAll(catalogAPI)
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

  function addToCart(item: ICatalogItem) {
    if(!isAuthenticated) {
      return;
    }

    addItemToBasket(item);
  }

  function addItemToBasket(item: ICatalogItem) {
    const basketAPI = process.env.REACT_APP_BASKET_API + "/api/v1/basket/";
    const email = user?.email;

    if (!email) {
      return;
    }

    let basket: IBasket = {
      buyerId: '',
      items: []
    };

    apiService.getAll(basketAPI + email)
      .then((data) => {
        setBasketItems(data.items);

        let basketItem = basketItems.find(value => value.productId === item.id);

        if (basketItem) {
          basketItem.quantity++;
        } else {
          let buyItem: IBasketItem = {
            id: item.id.toString(),
            productId: item.id,
            productName: item.name,
            unitPrice: item.price,
            oldUnitPrice: item.price,
            quantity: 1,
            pictureUrl: ""
          };
          basketItems.push(buyItem);
        }

        basket.buyerId = email;
        basket.items = basketItems;

        postBasketAPI(basket);
      })
      .catch((error) => {

      })
      .finally(() => {

      });
  }

  function postBasketAPI(basket: IBasket) {
    const url = process.env.REACT_APP_BASKET_API + '/api/v1/basket/';
    console.log("SET BASKET", basket);

    return apiService.post(url, JSON.stringify(basket));
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
        <div className="container">Error: something wrong </div>
      )
    }
    </>
  )
}
