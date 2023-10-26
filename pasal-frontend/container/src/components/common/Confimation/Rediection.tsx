import React from 'react';
import Model from '../Model/Model';
import ConfirmationTemplate from './Template';

type Props = {}

export default function RediectionConfirmation({ }: Props) {
  return (
    <Model ref={null}>
      <ConfirmationTemplate title='Navigate' description='we are going to navigate you 
to calling screen' confirmation='navigation' />

    </Model>
  )
}