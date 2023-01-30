import React from "react";
import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { rules } from "../utils/rulse";
import { IUser } from "./../models/User";
import { IEvent } from "./../models/Ievent";
import { useState } from "react";
import type { Moment } from 'moment'
import { formatDate } from "./../utils/date";
import { useTypedSelector } from './../hooks';

interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

const EventForm: React.FC<EventFormProps> = (props) => {
  const [event, setEvent] = useState<IEvent>({
    author: "",
    date: "",
    description: "",
    guest: "",
  } as IEvent);

  const selectDate = (date: any) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date.toDate())});
    }
  };

  const {user} = useTypedSelector(state => state.auth)

  const submitForm = () => {
    props.submit({...event, author: user.username})
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Название событие"
        name="description"
        rules={[rules.required()]}
      >
        <Input
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          value={event.description}
        />
      </Form.Item>
      <Form.Item label="Дата события" name="date" rules={[rules.required()]}>
        <DatePicker onChange={(date) => selectDate(date)} />
      </Form.Item>
      <Form.Item label="Выберите гостя" name="guest" rules={[rules.required()]}>
        <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
          {props.guests.map((guest) => (
            <Select.Option key={guest.username} value={guest.username}>
              {guest.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;
