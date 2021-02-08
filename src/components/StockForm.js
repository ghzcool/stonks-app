import React from "react";
import { Button, InputItem, List, Toast } from "antd-mobile";
import { createForm } from 'rc-form';
import { getPrice, usePrice } from "../hooks/priceHooks";
import { DEFAULT_CURRENCY } from "../constants";

function StockForm(props) {

  const { values, onSubmit, onCancel, form } = props;
  const { getFieldProps, getFieldError } = form;

  const price = usePrice();

  const onSymbolChange = (symbol) => {
    const uppercase = symbol.toUpperCase();
    form.setFieldsValue({ symbol: uppercase });
    onSymbolBlur();
  };

  const onSymbolBlur = () => {
    const symbol = form.getFieldValue('symbol');
    getPrice(symbol).then().catch();
  };

  return (
    <form>
      <List className="my-list">
        <InputItem placeholder="required" error={!!getFieldError('symbol')}
                   {...getFieldProps('symbol', {
                     initialValue: values.symbol,
                     rules: [
                       { required: true, message: 'Please input symbol' },
                     ],
                   })}
                   onChange={onSymbolChange}
                   onErrorClick={() => {
                     Toast.info(getFieldError('symbol').join('、'));
                   }}
        >Symbol</InputItem>
        <InputItem placeholder="required" error={!!getFieldError('amount')}
                   {...getFieldProps('amount', {
                     initialValue: values.amount,
                     rules: [
                       { required: true, message: 'Please input amount' },
                     ],
                   })}
                   type={'number'}
                   onErrorClick={() => {
                     Toast.info(getFieldError('amount').join('、'));
                   }}
        >Amount</InputItem>
        <InputItem placeholder="required" error={!!getFieldError('buyPrice')}
                   {...getFieldProps('buyPrice', {
                     initialValue: values.buyPrice,
                     rules: [
                       { required: true, message: 'Please input buy price' },
                     ],
                   })}
                   type={'digit'} extra={(price && price.currency) || DEFAULT_CURRENCY}
                   onErrorClick={() => {
                     Toast.info(getFieldError('buyPrice').join('、'));
                   }}
        >Buy price</InputItem>
        <InputItem placeholder=""
                   {...getFieldProps('transactionFee', { initialValue: values.transactionFee })}
                   type={'digit'} extra={(price && price.currency) || DEFAULT_CURRENCY}
        >Transaction fee</InputItem>
        <List.Item
          extra={<Button size="small" inline style={{ marginLeft: '0.25rem' }} onClick={onCancel}>Cancel</Button>}>
          <Button type="primary" size="small" inline disabled={!price || !price.value}
                  onClick={() => form.validateFields((error, value) => {
                    if (!error) {
                      onSubmit(form.getFieldsValue());
                    }
                  })}>Save</Button>
        </List.Item>
      </List>
    </form>
  );
}

export default createForm()(StockForm);
