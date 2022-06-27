const management = [{
    path: '/management/deviceList',
    name: 'management-deviceList',
    component: () =>
        import ('@/views/management/deviceList.vue'),
    meta: {
        layout: 'content',
    },
}]

export default management