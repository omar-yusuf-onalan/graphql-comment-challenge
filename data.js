const users = [
    { id: '1', fullName: 'John Smith' },
    { id: '2', fullName: 'Tanaka Tarou' },
];

const posts = [
    { id: '1', title: 'Johnun gönderisi', user_id: '1' },
    { id: '2', title: 'Johnun gönderisi', user_id: '1' },
    { id: '3', title: 'Tanakanin gönderisi', user_id: '2' },
];

const comments = [
    { id: '1', text: 'Lorem Ipsum', post_id: '1', user_id: '1' },
    { id: '2', text: 'foo bar', post_id: '1', user_id: '2' },
    { id: '3', text: 'foo var baz', post_id: '2', user_id: '1' },
];

module.exports = {
    users,
    posts,
    comments,
};
