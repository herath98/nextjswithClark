import React, { useState } from 'react';
import { Modal, Button, Input, Form, notification } from 'antd';
import { Select } from 'antd';

const AddProductModal = ({ isVisible, onClose, onAddProduct }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        onAddProduct(values);
        onClose();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Add New Product"
      visible={isVisible}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical" name="add_product_form">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the product name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select the product status!' }]}
        >
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="draft">Draft</Select.Option>
            <Select.Option value="archived">Archived</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please input the product price!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="totalSales"
          label="Total Sales"
          rules={[{ required: true, message: 'Please input the total sales!' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductModal;