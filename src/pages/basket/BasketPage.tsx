import { IBasket } from "@interfaces/IBasket";
import { IBasketItem } from "@interfaces/IBasketItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import delete_img from "../../assets/images/delete.svg";
import minus_img from "../../assets/images/minus.svg";
import plus_img from "../../assets/images/plus.svg";

export function BasketPage() {
  const [basket, setBasket] = useState<IBasket>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  function deleteItem(id: string) {
    console.log("deleteItem");
    // basket?.items = basket?.items.filter(item => item.id !== id);
    // calculateTotalPrice();

    // this.basketSerive.setBasket(basket).subscribe(x =>
    //   {
    //     this.basketSerive.updateQuantity();
    //     console.log('basket updated: ' + x)
    //   }
    // );
  }

  function itemQuantityChanged(item: IBasketItem, quantity: number) {
    console.log("itemQuantityChanged");
    item.quantity = quantity > 0 ? quantity : 1;
    calculateTotalPrice();
    //this.basketSerive.setBasket(this.basket).subscribe(x => console.log('basket updated: ' + x));
  }

  function checkOut(event: any) {}

  function calculateTotalPrice() {
    basket?.items.forEach(item => {
      var tmpTotalPrice = totalPrice;
      tmpTotalPrice += (item.unitPrice * item.quantity);
      setTotalPrice(tmpTotalPrice);
    });
}

  return (
    <div className="esh-basket">
      <div className="container">
        <h1 className="mb-4 mt-5">Shopping Bag</h1>
        {/* <div>
                    <div className="esh-basket-items-margin-left1 row">
                        <div className="alert alert-warning" role="alert">&nbsp;{errorMessage}</div>
                    </div>
                </div> */}

        <div className="row">
          <div className="col-6 col-md-8 col-lg-9">
            <div className="esh-basket-items row">
              {basket?.items &&
                basket?.items.map((item, index) => (
                  <div key={index} className="col-12 col-md-6 col-lg-4">
                    <article className="esh-basket-item">
                      <div className="esh-basket-thumbnail-wrapper">
                        <div
                          className="esh-basket-delete"
                          onClick={() => deleteItem(item.id)}
                        >
                          <img
                            className="esh-basket-delete-svg"
                            src={delete_img}
                            alt="delete"
                          />
                        </div>
                        <img
                          className="esh-basket-thumbnail"
                          src=""
                          alt="product"
                        />
                      </div>
                      <div className="esh-basket-title">{item.productName}</div>
                      <div className="esh-basket-description divider d-flex align-items-center justify-content-between">
                        <div className="">$ {item.unitPrice}</div>
                        <div className="esh-basket-buttons d-flex justify-content-center">
                          <button
                            // [ngClass]="{'esh-basket-button': true, 'is-disabled': item.quantity === 1}"
                            onClick={() =>
                              itemQuantityChanged(item, item.quantity + 1)
                            }
                          >
                            <img
                              className="esh-basket-button-svg"
                              src={minus_img}
                              alt="minus"
                            />
                          </button>
                          <div className="esh-basket-quantity">
                            {item.quantity}
                          </div>
                          <button
                            className="esh-basket-button"
                            onClick={() =>
                              itemQuantityChanged(item, item.quantity + 1)
                            }
                          >
                            <img
                              className="esh-basket-button-svg"
                              src={plus_img}
                              alt="plus"
                            />
                          </button>
                        </div>
                        <div className="esh-basket-price text-right">
                          $ {item.unitPrice * item.quantity}
                        </div>
                      </div>
                      {/* <div className="" *ngIf="item.oldUnitPrice > 0">
                                        &nbsp;Note that the price of this article changed in our Catalog. The old price when you originally added it to the basket was $ {{item.oldUnitPrice}}
                                    </div> */}
                    </article>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="esh-basket-checkout p-4">
              <h2 className="esh-basket-checkout-title">Your shopping bag</h2>
              <div className="mb-3 u-text-sm">
                ({basket?.items ? basket?.items.length : 0} items)
              </div>

              <div className="d-flex justify-content-between align-items-center font-weight-bolder">
                <div>TOTAL</div>
                <div>${totalPrice}</div>
              </div>
            </div>

            <div className="divider u-background-brightest p-4">
              <div>
                <button
                  className="btn btn-primary u-width-100 u-minwidth-unset"
                  onClick={checkOut}
                >
                  Checkout
                </button>
              </div>
            </div>
            <div className="p-4">
              <Link
                className="btn btn-secondary u-width-100 u-minwidth-unset"
                to="/catalog"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
