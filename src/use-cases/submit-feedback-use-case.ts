import { MailAdapter } from "../repositories/adapter/mail-adapter"
import { FeedbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackUseCaseRequest {
    type: string
    comment: string
    screenshot?: string
}

export class SubmitFeedbackUseCase {

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) { }

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request

        if (!type || !comment) {
            throw new Error('Type and Comment are required!')
        }

        await this.feedbacksRepository.create({
            type, comment, screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px color: #111">`,
                `<p>Tipo do feedback ${type}</p>`,
                `<p>Comentário ${comment}</p>`,
                `</div>`
            ].join('\n')
        })
    }
}