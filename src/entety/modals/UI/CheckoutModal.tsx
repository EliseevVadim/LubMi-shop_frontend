import React, {useEffect, useRef, useState} from 'react';
import {useUnit} from "effector-react";
import {
  $isOpenBucket,
  $isOpenCheckout,
  $productModal,
  onChangeIsOpenCheckout,
  onSetNotification,
  setProductModal
} from "../model/index";
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import 'react-dadata/dist/react-dadata.css';
import FirstStep from "@/entety/modals/UI/Checkout/FirstStep";
import SecondStep from "@/entety/modals/UI/Checkout/SecondStep";

const CheckoutModal = () => {

  const [
    isOpenCheckout,
  ] = useUnit([
    $isOpenCheckout,
  ])

  const [step, setStep] = useState(true)

  return (
    <div className={`checkout-modal ${isOpenCheckout ? 'checkout-modal-open' : ''}`}>
      <MaxWithLayout>

        {isOpenCheckout &&
            <>
                <div style={{display: step ? 'block' : 'none', minHeight: '90vh', height: '100%', paddingBottom: 20}}>
                    <FirstStep
                        step={step}
                        setStep={setStep}
                    />
                </div>

                <div style={{display: step ? 'none' : 'block', minHeight: '90vh', height: '100%', paddingBottom: 10}}>
                    <SecondStep
                        step={step}
                        setStep={setStep}
                    />
                </div>
            </>
        }

      </MaxWithLayout>
    </div>
  );
};

export default CheckoutModal;
