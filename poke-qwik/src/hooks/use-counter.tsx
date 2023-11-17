import { useSignal, $, useComputed$ } from '@builder.io/qwik';

export const useCounter = (initialValue: number) => {   

    const counter = useSignal(initialValue);

    const increaseCounter = $(() => {
        counter.value++;
    })

    const decreaseCounter = $(() => {
        counter.value--;
    })
    // encapsular el valor para evitar su manipulación
    return { counter: useComputed$(() => counter.value), increaseCounter, decreaseCounter};
};