import React from "react";
import { Button, Layout, Modal, Row } from "antd";
import EventCalendar from "./Calendar";
import { useState } from "react";
import EventForm from "../components/EventForm";
import {useEffect} from "react"
import { useActions } from './../hooks/useActions';
import { useTypedSelector } from "../hooks";
import { IEvent } from './../models/Ievent';

const Event: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {fetchGuests, createEvent, fetchEvents} = useActions();
  const {guests,events} = useTypedSelector(state => state.event);
  const {user} = useTypedSelector(state => state.auth);

  useEffect(() => {
      fetchGuests()
      fetchEvents(user.username);
  }, [])

  const addNewEvent = (event: IEvent) => {
      setModalVisible(false);
      createEvent(event);
  }

  return (
      <Layout>
          <EventCalendar events={events}/>
          <Row justify="center">
              <Button
                  onClick={() => setModalVisible(true)}
              >
                  Добавить событие
              </Button>
          </Row>
          <Modal
              title="Добавить событие"
              visible={modalVisible}
              footer={null}
              onCancel={() => setModalVisible(false)}
          >
              <EventForm
                  guests={guests}
                  submit={addNewEvent}
              />
          </Modal>
      </Layout>
  );
};

export default Event;
