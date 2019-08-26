import Mail from '../../lib/Mail';

class NewSubscriptionMail {
    get key() {
        return 'NewSubscriptionMail';
    }

    async handle({ data }) {
        const { subscriber, meetup } = data;

        console.info(`${this.key} queue was started!`);

        await Mail.sendMail({
            to: `${meetup.user.name} <${meetup.user.email}>`,
            title: `Novo participante | ${meetup.title}`,
            template: 'newSubscription',
            context: {
                organizerName: meetup.user.name,
                meetName: meetup.title,
                subName: subscriber.name,
                subEmail: subscriber.email
            }
        });
    }
}

export default new NewSubscriptionMail();
