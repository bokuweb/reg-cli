import test from 'ava';
import Vue from 'vue';
import CaptureImage from '../../report/src/views/CaptureImage.vue';
import { getInstance } from '../helpers/get-instance';

test('should render CaptureImage a img', async t => {
    const instance = getInstance(CaptureImage, {
        src: './',
    });
    t.is(instance.$el.querySelectorAll("img").length, 1);
});