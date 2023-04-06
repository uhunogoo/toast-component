import React from 'react';

import Button from '../Button';
import { ToastContext } from '../ToastProvider'
import ToastShelf from '../ToastShelf'

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const { addNewToast } = React.useContext( ToastContext );
  const [ message, setMessage ] = React.useState('');
  const [ toastVariant, setToastVariant ] = React.useState(
    VARIANT_OPTIONS[0]
  );

  function handleAddNewToast(e) {
    e.preventDefault();
    addNewToast( message, toastVariant );
    setMessage('');
    setToastVariant(VARIANT_OPTIONS[0]);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form 
        className={styles.controlsWrapper}
        onSubmit={ handleAddNewToast }
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea 
              id="message" 
              className={styles.messageInput} 
              value={ message }
              onChange={ event => {
                setMessage(event.target.value)
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            { VARIANT_OPTIONS.map((option, id) => 
              <VariantLabel 
                key={id} 
                option={ option } 
                checked={toastVariant === option}
                onChange={event => {
                  setToastVariant(event.target.value)
                }}
              />
            ) }
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>
              Pop Toast!
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function VariantLabel({ option, ...delegated }) {
  const variantId = `variant-${ option }`;
  return (
    <label htmlFor={variantId}>
      <input
        {...delegated}
        id={variantId}
        type="radio"
        name="variant"
        value={ option }
      />
      { option }
    </label>
  );
}

export default ToastPlayground;
