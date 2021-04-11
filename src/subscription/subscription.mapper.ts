
import { Subscription, GENDER } from '../types';
import { SubscriptionDTO } from './dto/subscription.dto';

const formatYmd = date => date.toISOString().slice(0, 10);

/**
 * @description Transform subscription service response at SubscriptionDto format
 * @param other
 * @typeParam any
 * @returns SubscriptionDTO
 * @category Mapper
 */
export function toSubscriptionDTO(other: any): SubscriptionDTO {
    const dto: SubscriptionDTO = {
        id: other.id,
        email: other.email,
        dateOfBirth: formatYmd (
          new Date(other.dateOfBirth)
        ),
        flagForConsent: other.flagForConsent,
        newsletterId: other.newsletterId,
        firstName: other.firstName,
        gender: GENDER[other.gender],
        createdAt: other.createdAt,
        updatedAt: other.modifiedAt
    };

    return dto;
}

// `date` is a `Date` object

/**
 * @description Transform CreateSubscriptionDTO at Subscription format
 * @param other
 * @typeParam any
 * @returns Subscription
 * @category Mapper
 */
export function toSubscription(dto: any): Subscription {
  return {
      email: dto.email,
      dateOfBirth: new Date(dto.dateOfBirth).getTime(),
      flagForConsent: dto.flagForConsent,
      newsletterId: dto.newsletterId,
      firstName: dto.firstName,
      gender: GENDER[dto.gender.toUpperCase()],
  };
}