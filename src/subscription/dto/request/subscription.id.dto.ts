import * as Joi from 'joi';

import { JoiValidationPipe } from '../../../common/joi.validation.pipe';

const SubscriptionIdSchema = Joi.object({
    id: Joi.string().required(),
});

export const SubscriptionIdPipe = new JoiValidationPipe(SubscriptionIdSchema);