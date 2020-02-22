import * as t from 'io-ts'
import { createEnumType, ListPagination } from '../commons/types'
import { CampaignId, CampaignIds } from '../campaigns/types'
import { AdGroupId, AdGroupIds } from '../adGroups/types'
import { DateFromNumber } from 'io-ts-types/lib/DateFromNumber'

export const TargetId = t.number
export type TargetId = t.TypeOf<typeof TargetId>

export const TargetIds = t.array(TargetId)
export type TargetIds = t.TypeOf<typeof TargetIds>

export enum TargetingClauseStateEnum {
  ENABLED = 'enabled',
  PAUSED = 'paused',
  ARCHIVED = 'archived',
}
export const TargetingClauseStateType = createEnumType<TargetingClauseStateEnum>(
  TargetingClauseStateEnum,
)

export enum TargetingExpressionTypeEnum {
  ASIN_CATEGORY_SAME_AS = 'asinCategorySameAs',
  ASIN_BRAND_SAME_AS = 'asinBrandSameAs',
  ASIN_PRICE_LESS_THAN = 'asinPriceLessThan',
  ASIN_PRICE_BETWEEN = 'asinPriceBetween',
  ASIN_PRICE_GREATER_THAN = 'asinPriceGreaterThan',
  ASIN_REVIEW_RATING_LESS_THAN = 'asinReviewRatingLessThan',
  ASIN_REVIEW_RATING_BETWEEN = 'asinReviewRatingBetween',
  ASIN_REVIEW_RATING_GREATER_THAN = 'asinReviewRatingGreaterThan',
  ASIN_SAME_AS = 'asinSameAs',
  ASIN_IS_PRIME_SHIPPING_ELIGIBLE = 'asinIsPrimeShippingEligible',
  ASIN_AGE_RANGE_SAME_AS = 'asinAgeRangeSameAs',
  ASIN_GENRE_SAME_AS = 'asinGenreSameAs',
  QUERY_HIGH_REL_MATCHES = 'queryHighRelMatches',
  QUERY_BROAD_REL_MATCHES = 'queryBroadRelMatches',
  ASIN_SUBSTITUTE_RELATED = 'asinSubstituteRelated',
  ASIN_ACCESSORY_RELATED = 'asinAccessoryRelated',
}
export const TargetingExpressionType = createEnumType<TargetingExpressionTypeEnum>(
  TargetingExpressionTypeEnum,
)

export const TargetingExpression = t.intersection([
  t.strict({
    /**
     * The type of intent
     */
    type: TargetingExpressionType,
  }),
  t.partial({
    /**
     * The value which should be targeted
     */
    value: t.string,
  }),
])

export type TargetingExpression = t.TypeOf<typeof TargetingExpression>

export const TargetingExpressions = t.array(TargetingExpression)
export type TargetingExpressions = t.TypeOf<typeof TargetingExpressions>

export enum ExpressionTypeEnum {
  AUTO = 'auto',
  MANUAL = 'manual',
}
export const ExpressionType = createEnumType<ExpressionTypeEnum>(ExpressionTypeEnum)

export enum TargetingClauseServingStatusEnum {
  TARGETING_CLAUSE_ARCHIVED = 'TARGETING_CLAUSE_ARCHIVED',
  TARGETING_CLAUSE_PAUSED = 'TARGETING_CLAUSE_PAUSED',
  TARGETING_CLAUSE_STATUS_LIVE = 'TARGETING_CLAUSE_STATUS_LIVE',
  TARGETING_CLAUSE_POLICING_SUSPENDED = 'TARGETING_CLAUSE_POLICING_SUSPENDED',
  CAMPAIGN_OUT_OF_BUDGET = 'CAMPAIGN_OUT_OF_BUDGET',
  AD_GROUP_PAUSED = 'AD_GROUP_PAUSED',
  AD_GROUP_ARCHIVED = 'AD_GROUP_ARCHIVED',
  CAMPAIGN_PAUSED = 'CAMPAIGN_PAUSED',
  CAMPAIGN_ARCHIVED = 'CAMPAIGN_ARCHIVED',
  ACCOUNT_OUT_OF_BUDGET = 'ACCOUNT_OUT_OF_BUDGET',
  PORTFOLIO_ENDED = 'PORTFOLIO_ENDED',
}
export const TargetingClauseServingStatusType = createEnumType<TargetingClauseServingStatusEnum>(
  TargetingClauseServingStatusEnum,
)
export const TargetingClause = t.intersection([
  t.strict({
    /**
     * The ID of the target
     */
    targetId: TargetId,

    /**
     * The ID of the campaign to which this target belongs
     */
    campaignId: CampaignId,

    /**
     * The ID of the ad group to which this target belongs.
     */
    adGroupId: AdGroupId,

    /**
     * Advertiser-specified state of the target
     */
    state: TargetingClauseStateType,

    /**
     * The expression to match against search queries
     */
    expression: TargetingExpressions,

    /**
     * The type of expression
     */
    expressionType: ExpressionType,
  }),
  t.partial({
    /**
     * Bid used when ads are sourced using this target.
     */
    bid: t.number,
  }),
])
export type TargetingClause = t.TypeOf<typeof TargetingClause>

export const TargetingClauses = t.array(TargetingClause)
export type TargetingClauses = t.TypeOf<typeof TargetingClause>

export const TargetingClauseExtended = t.intersection([
  TargetingClause,
  t.strict({
    /**
     * The date the ad group was created as epoch time in milliseconds.
     */
    creationDate: DateFromNumber,

    /**
     * The date the ad group was last updated as epoch time in milliseconds.
     */
    lastUpdatedDate: DateFromNumber,

    /**
     * The computed status, accounting for out of budget, policy violations, etc. See developer notes for more information.
     */
    servingStatus: TargetingClauseServingStatusType,
  }),
])
export type TargetingClauseExtended = t.TypeOf<typeof TargetingClauseExtended>

export const ProductRecommendationRequest = t.strict({
  /**
   * The number of recommendations to return in one page.
   */
  pageSize: t.number,

  /**
   * The number of pages to index into the result set
   */
  pageNumber: t.number,

  /**
   * A list of asins for which to get recommendations for
   */
  asins: t.array(t.string),
})
export type ProductRecommendationRequest = t.TypeOf<typeof ProductRecommendationRequest>

export const RecommendedTargetAsin = t.strict({
  /**
   * The recommended asin to target
   */
  recommendedTargetAsin: t.string,
})

export type RecommendedTargetAsin = t.TypeOf<typeof RecommendedTargetAsin>
export const RecommendedTargetAsins = t.array(RecommendedTargetAsin)

export const ProductRecommendationResponse = t.strict({
  /**
   * The number of recommendations from which there are to page through.
   */
  totalResultCount: t.number,

  /**
   * The number of pages to index into the result set
   */
  recommendedProducts: RecommendedTargetAsins,
})
export type ProductRecommendationResponse = t.TypeOf<typeof ProductRecommendationResponse>

export const CategoryId = t.number
export type CategoryId = t.TypeOf<typeof CategoryId>

export const CategoryResponse = t.strict({
  /**
   * The ID of the category
   */
  id: CategoryId,

  /**
   * The name of the category
   */
  name: t.string,

  /**
   * A boolean describing whether this category can be targeted or not in a targeting expression
   */
  isTargetable: t.boolean,

  /**
   * The path of the category within the category catalogue
   */
  path: t.string,
})
export type CategoryResponse = t.TypeOf<typeof CategoryResponse>

export const AgeRange = t.strict({
  /**
   * The id of the age range.
   */
  id: t.number,

  /**
   * The name of the age range
   */
  name: t.string,
})
export type AgeRange = t.TypeOf<typeof AgeRange>
export const AgeRanges = t.array(AgeRange)

export const BrandId = t.number
export type BrandId = t.TypeOf<typeof BrandId>

export const BrandResponse = t.strict({
  /**
   * The ID of the brand. This is for use in targeting expressions.
   */
  id: BrandId,

  /**
   * The name of the brand
   */
  name: t.string,
})
export type BrandResponse = t.TypeOf<typeof BrandResponse>
export const BrandResponses = t.array(BrandResponse)

export const RefinementsResponse = t.strict({
  /**
   * The ID of the category
   */
  categoryId: CategoryId,

  /**
   * An array of age ranges this category supports.  Not all categories have age ranges.
   */
  ageRanges: AgeRanges,

  /**
   * Brands that can be found within this category.
   */
  brands: BrandResponses,
})
export type RefinementsResponse = t.TypeOf<typeof RefinementsResponse>

export const TargetingClauseResponse = t.partial({
  /**
   * The ID of the target that was created/updated, if successful
   */
  targetId: TargetId,

  /**
   * An enumerated success or error code for machine use.
   */
  code: t.string,

  /**
   * A human-readable description of the error, if unsuccessful
   */
  details: t.string,
})
export type TargetingClauseResponse = t.TypeOf<typeof TargetingClauseResponse>

export const CreateTargetingClausesParams = t.partial({
  /**
   * The ID of the campaign to which this target belongs
   */
  campaignId: CampaignId,

  /**
   * The ID of the ad group to which this target belongs.
   */
  adGroupId: AdGroupId,

  /**
   * Advertiser-specified state of the target
   */
  state: TargetingClauseStateType,

  /**
   * The expression to match against search queries
   */
  expression: TargetingExpressions,

  /**
   * The type of expression
   */
  expressionType: ExpressionType,

  /**
   * Bid used when ads are sourced using this target.
   */
  bid: t.number,
})
export type CreateTargetingClausesParams = t.TypeOf<typeof CreateTargetingClausesParams>

export const ListTargetingClausesParams = t.intersection([
  ListPagination,
  t.partial({
    /**
     * Restricts results to targets with state within the specified comma-separated list.
     * Possible filter types are: enabled, paused, or archived
     */
    stateFilter: TargetingClauseStateType,

    /**
     * Restricts results to targets within campaigns specified in comma-separated list
     */
    campaignIdFilter: CampaignIds,

    /**
     * Restricts results to targets within ad groups specified in comma-separated list
     */
    adGroupIdFilter: AdGroupIds,

    /**
     * Restricts results to targets with the specified target Ids specified in comma-separated list
     */
    targetIdFilter: TargetIds,
  }),
])
export type ListTargetingClausesParams = t.TypeOf<typeof ListTargetingClausesParams>

export const UpdateTargetingClausesParams = t.partial({
  /**
   * The ID of the target
   */
  targetId: TargetId,

  /**
   * The ID of the campaign to which this target belongs
   */
  campaignId: CampaignId,

  /**
   * The ID of the ad group to which this target belongs.
   */
  adGroupId: AdGroupId,

  /**
   * Advertiser-specified state of the target
   */
  state: TargetingClauseStateType,

  /**
   * The expression to match against search queries
   */
  expression: TargetingExpressions,

  /**
   * The type of expression
   */
  expressionType: ExpressionType,

  /**
   * Bid used when ads are sourced using this target.
   */
  bid: t.number,
})
export type UpdateTargetingClausesParams = t.TypeOf<typeof UpdateTargetingClausesParams>

export const GetBrandRecommendationsParams = t.partial({
  keyword: t.string,
  categoryId: CategoryId,
})

export type GetBrandRecommendationsParams = t.TypeOf<typeof GetBrandRecommendationsParams>

export const NegativeTargetingClauseResponse = t.partial({
  /**
   * The ID of the negative target that was created/updated, if successful
   */
  targetId: TargetId,

  /**
   * An enumerated success or error code for machine use.
   */
  code: t.string,

  /**
   * A human-readable description of the error, if unsuccessful
   */
  details: t.string,
})
export type NegativeTargetingClauseResponse = t.TypeOf<typeof NegativeTargetingClauseResponse>

export const CreateNegativeTargetingClausesParams = t.strict({
  /**
   * The ID of the campaign to which this negative target belongs
   */
  campaignId: CampaignId,

  /**
   * The ID of the ad group to which this negative target belongs.
   */
  adGroupId: AdGroupId,

  /**
   * Advertiser-specified state of the negative target
   */
  state: TargetingClauseStateType,

  /**
   * The expression to match against search queries
   */
  expression: TargetingExpressions,

  /**
   * The type of expression
   */
  expressionType: ExpressionType,
})
export type CreateNegativeTargetingClausesParams = t.TypeOf<
  typeof CreateNegativeTargetingClausesParams
>

export const NegativeTargetingClause = t.strict({
  /**
   * The ID of the negative target
   */
  targetId: TargetId,

  /**
   * The ID of the campaign to which this negative target belongs
   */
  campaignId: CampaignId,

  /**
   * The ID of the ad group to which this negative target belongs.
   */
  adGroupId: AdGroupId,

  /**
   * Advertiser-specified state of the negative target
   */
  state: TargetingClauseStateType,

  /**
   * The expression to match against search queries
   */
  expression: TargetingExpressions,

  /**
   * The type of expression
   */
  expressionType: ExpressionType,
})
export type NegativeTargetingClause = t.TypeOf<typeof NegativeTargetingClause>

export const NegativeTargetingClauseExtended = t.intersection([
  NegativeTargetingClause,
  t.strict({
    /**
     * The date the ad group was created as epoch time in milliseconds.
     */
    creationDate: DateFromNumber,

    /**
     * The date the ad group was last updated as epoch time in milliseconds.
     */
    lastUpdatedDate: DateFromNumber,

    /**
     * The computed status, accounting for out of budget, policy violations, etc. See developer notes for more information.
     */
    servingStatus: TargetingClauseServingStatusType,
  }),
])
export type NegativeTargetingClauseExtended = t.TypeOf<typeof NegativeTargetingClauseExtended>

export const ListNegativeTargetingClausesParams = t.intersection([
  ListPagination,
  t.partial({
    /**
     * Restricts results to targets with state within the specified comma-separated list.
     * Possible filter types are: enabled, paused, or archived
     */
    stateFilter: TargetingClauseStateType,

    /**
     * Restricts results to targets within campaigns specified in comma-separated list.
     */
    campaignIdFilter: CampaignIds,

    /**
     * Restricts results to targets within ad groups specified in comma-separated list.
     */
    adGroupIdFilter: AdGroupIds,

    /**
     * Restricts results to targets with the specified target Ids specified in comma-separated list.
     */
    targetIdFilter: TargetIds,
  }),
])
export type ListNegativeTargetingClausesParams = t.TypeOf<typeof ListNegativeTargetingClausesParams>

export const UpdateNegativeTargetingClausesParams = t.partial({
  /**
   * The ID of the negative target.
   */
  targetId: TargetId,

  /**
   * The ID of the campaign to which this negative target belongs.
   */
  campaignId: CampaignId,

  /**
   * The ID of the ad group to which this negative target belongs.
   */
  adGroupId: AdGroupId,

  /**
   * Advertiser-specified state of the negative target.
   */
  state: TargetingClauseStateType,

  /**
   * The expression to match against search queries.
   */
  expression: TargetingExpressions,

  /**
   * The type of expression.
   */
  expressionType: ExpressionType,
})
export type UpdateNegativeTargetingClausesParams = t.TypeOf<
  typeof UpdateNegativeTargetingClausesParams
>

// Sponsored brands product targeting types

export enum SBTargetStateEnum {
  ENABLED = 'ENABLED',
  PAUSED = 'PAUSED',
  PENDING = 'PENDING',
  ARCHIVED = 'ARCHIVED',
  DRAFT = 'DRAFT',
}
export const SBTargetStateType = createEnumType<SBTargetStateEnum>(SBTargetStateEnum)

export enum SBFilterTypeEnum {
  STATE = 'STATE',
  CAMPAIGN_ID = 'CAMPAIGN_ID',
  AD_GROUP_ID = 'AD_GROUP_ID',
}
export const SBFilterType = createEnumType<SBFilterTypeEnum>(SBFilterTypeEnum)

const SBFilterValue = t.union([SBTargetStateType, CampaignId, AdGroupId])

const SBTargetFilter = t.strict({
  filterType: SBFilterType,
  values: t.array(SBFilterValue),
})
type SBTargetFilter = t.TypeOf<typeof SBTargetFilter>

const SBTargetFilters = t.array(SBTargetFilter)
type SBTargetFilters = t.TypeOf<typeof SBTargetFilters>

export const SBListTargetsRequest = t.strict({
  /**
   * Operations that return paginated results include a pagination token in this field.
   * To retrieve the next page of results, call the same operation and specify this token in the request.
   * If the NextToken field is empty, there are no further results.
   */
  nextToken: t.string,

  /**
   * Sets a limit on the number of results returned by an operation.
   */
  maxResults: t.number,

  /**
   * Restricts results to targets with the specified filters.
   * Filters are inclusive. Filters are joined using 'and' logic.
   * Specify one type of each filter.
   * Specifying multiples of the same type of filter results in an error.
   */
  filters: SBTargetFilters,
})
export type SBListTargetsRequest = t.TypeOf<typeof SBListTargetsRequest>

export enum ProductPredicateTypeEnum {
  ASIN_CATEGORY_SAME_AS = 'asinCategorySameAs',
  ASIN_BRAND_SAME_AS = 'asinBrandSameAs',
  ASIN_PRICE_LESS_THAN = 'asinPriceLessThan',
  ASIN_PRICE_BETWEEN = 'asinPriceBetween',
  ASIN_PRICE_GREATER_THAN = 'asinPriceGreaterThan',
  ASIN_REVIEW_RATING_LESS_THAN = 'asinReviewRatingLessThan',
  ASIN_REVIEW_RATING_BETWEEN = 'asinReviewRatingBetween',
  ASIN_REVIEW_RATING_GREATER_THAN = 'asinReviewRatingGreaterThan',
  ASIN_SAME_AS = 'asinSameAs',
}
export const ProductPredicateType = createEnumType<ProductPredicateTypeEnum>(
  ProductPredicateTypeEnum,
)

const SBExpression = t.strict({
  type: ProductPredicateType,
  value: t.string,
})
type SBExpression = t.TypeOf<typeof SBExpression>

const SBExpressions = t.array(SBExpression)
type SBExpressions = t.TypeOf<typeof SBExpressions>

const SBResolvedExpression = t.strict({
  type: ProductPredicateType,
  value: t.string,
})
type SBResolvedExpression = t.TypeOf<typeof SBResolvedExpression>

const SBResolvedExpressions = t.array(SBResolvedExpression)
type SBResolvedExpressions = t.TypeOf<typeof SBResolvedExpressions>

export enum SBExpressionStateEnum {
  ENABLED = 'enabled',
  PAUSED = 'paused',
  PENDING = 'pending',
  ARCHIVED = 'archived',
  DRAFT = 'draft',
}
export const SBExpressionStateType = createEnumType<SBExpressionStateEnum>(SBExpressionStateEnum)

export const SBTargetingClause = t.strict({
  /**
   * The target identifier.
   */
  targetId: TargetId,

  /**
   * The identifier of the ad group to which the target is associated.
   */
  adGroupId: AdGroupId,

  /**
   * The identifier of the campaign to which the target is associated.
   */
  campaignId: CampaignId,

  expressions: SBExpression,

  resolvedExpressions: SBResolvedExpression,

  state: SBExpressionStateType,

  /**
   * The associated bid.
   * Note that this value must be less than the budget associated with the Advertiser account.
   * For more information, see supported features.
   */
  bid: t.number,
})
export type SBTargetingClause = t.TypeOf<typeof SBTargetingClause>

export const SBTargetingClauses = t.array(SBTargetingClause)
export type SBTargetingClauses = t.TypeOf<typeof SBTargetingClauses>

export const SBListTargetsResponse = t.strict({
  /**
   * Operations that return paginated results include a pagination token in this field.
   * To retrieve the next page of results, call the same operation and specify this token in the request.
   * If the NextToken field is empty, there are no further results.
   */
  nextToken: t.string,

  targets: SBTargetingClauses,
})
export type SBListTargetsResponse = t.TypeOf<typeof SBListTargetsResponse>

export const SBUpdateTargetsRequest = t.partial({
  /**
   * The identifier of the target.
   */
  targetId: TargetId,

  /**
   * The identifier of the ad group to which the target is associated.
   */
  adGroupId: AdGroupId,

  /**
   * The identifier of the campaign to which the target is associated.
   */
  campaignId: CampaignId,

  /**
   * The state of the target.
   */
  state: SBExpressionStateType,

  /**
   * The associated bid.
   * Note that this value must be less than the budget associated with the Advertiser account.
   * For more information, see supported features.
   */
  bid: t.number,
})
export type SBUpdateTargetsRequest = t.TypeOf<typeof SBUpdateTargetsRequest>

export const SBUpdateTargetsResponse = t.strict({
  /**
   * Lists the successfully updated targets.
   * Note that targets in the response are correlated to targets in the request using the targetRequestIndex field.
   * For example, if targetRequestIndex is set to 2, the values correlate to the third target object in the request.
   */
  updateTargetSuccessResults: t.array(
    t.strict({
      /**
       * The identifier of a target.
       */
      targetId: TargetId,

      /**
       * Correlates the target to the target array index specified in the request. Zero-based.
       */
      targetRequestIndex: t.number,
    }),
  ),

  /**
   * Lists errors that occured during target update.
   * Note that errors are correlated to target update requests by the targetRequestIndex field.
   * This field corresponds to the order of the target in the request.
   * For example, if targetRequestIndex is set to 2, the values correlate to the third target object in the request array.
   */
  updateTargetErrorResults: t.array(
    t.strict({
      code: t.string,

      details: t.string,

      targetId: TargetId,

      targetRequestIndex: t.number,
    }),
  ),
})
export type SBUpdateTargetsResponse = t.TypeOf<typeof SBUpdateTargetsResponse>

const SBCreateTargetingClauseRequest = t.strict({
  /**
   * The identifier of an existing ad group.
   * The newly created target is associated to this ad group.
   */
  adGroupId: AdGroupId,

  /**
   * The identifier of an existing campaign.
   * The newly created target is associated to this campaign.
   */
  campaignId: CampaignId,

  expressions: SBExpression,

  /**
   * The associated bid.
   * Note that this value must be less than the budget associated with the Advertiser account.
   * For more information, see supported features.
   */
  bid: t.number,
})
type SBCreateTargetingClauseRequest = t.TypeOf<typeof SBCreateTargetingClauseRequest>

export const SBCreateTargetsRequest = t.strict({
  targets: t.array(SBCreateTargetingClauseRequest),
})
export type SBCreateTargetsRequest = t.TypeOf<typeof SBCreateTargetsRequest>

export const SBCreateTargetsReponse = SBUpdateTargetsRequest
export type SBCreateTargetsReponse = t.TypeOf<typeof SBCreateTargetsReponse>

export const SBTargetingClauseResponse = t.partial({
  /**
   * The target identifier.
   */
  targetId: TargetId,

  code: t.string,

  details: t.string,
})
export type SBTargetingClauseResponse = t.TypeOf<typeof SBTargetingClauseResponse>

export const SBBatchGetTargetsRequest = t.strict({
  targetIds: TargetIds,
})
export type SBBatchGetTargetsRequest = t.TypeOf<typeof SBBatchGetTargetsRequest>

export const SBBatchGetTargetsReponse = t.strict({
  /**
   * A list of targeting clause objects.
   * Note that each targeting clause object is correlated to the list request by the targetRequestIndex field.
   * This field corresponds to the order of the targeting identifier in the request.
   */
  batchGetTargetSuccessResults: t.array(
    t.strict({
      targetingClause: SBTargetingClause,

      targetRequestIndex: t.number,
    }),
  ),

  /**
   * A list of target identifiers that were not found.
   * Note that each target identifier is correlated to the list request by the targetRequestIndex field.
   * This field corresponds to the order of the target identifier in the request.
   */
  batchGetTargetErrorResults: t.array(
    t.strict({
      code: t.string,

      details: t.string,

      targetId: TargetId,

      targetRequestIndex: t.number,
    }),
  ),
})
export type SBBatchGetTargetsReponse = t.TypeOf<typeof SBBatchGetTargetsReponse>

export const SBListNegativeTargetsRequest = SBListTargetsRequest
export type SBListNegativeTargetsRequest = t.TypeOf<typeof SBListNegativeTargetsRequest>

export const SBListNegativeTargetsResponse = t.strict({
  /**
   * Operations that return paginated results include a pagination token in this field.
   * To retrieve the next page of results, call the same operation and specify this token in the request.
   * If the NextToken field is empty, there are no further results.
   */
  nextToken: t.string,

  negativeTargets: SBTargetingClauses,
})
export type SBListNegativeTargetsResponse = t.TypeOf<typeof SBListNegativeTargetsResponse>

const SBUpdateNegativeTargetingClauseRequest = t.partial({
  /**
   * The target identifier.
   */
  targetId: TargetId,

  /**
   * The identifier of an existing ad group. The newly created target is associated to this ad group.
   */
  adGroupId: AdGroupId,

  state: SBExpressionStateType,
})

export const SBUpdateNegativeTargetsRequest = t.strict({
  negativeTargets: t.array(SBUpdateNegativeTargetingClauseRequest),
})
export type SBUpdateNegativeTargetsRequest = t.TypeOf<typeof SBUpdateNegativeTargetsRequest>

export const SBUpdateNegativeTargetsResponse = SBUpdateTargetsResponse
export type SBUpdateNegativeTargetsResponse = t.TypeOf<typeof SBUpdateNegativeTargetsResponse>

export enum SBNegativeExpressionTypeEnum {
  ASIN_BRAND_SAME_AS = 'asinBrandSameAs',
  ASIN_SAME_AS = 'asinSameAs',
}
export const SBNegativeExpressionType = createEnumType<SBNegativeExpressionTypeEnum>(
  SBNegativeExpressionTypeEnum,
)

const SBNegativeExpression = t.strict({
  type: SBNegativeExpressionType,

  /**
   * The text of the negative expression.
   */
  value: t.string,
})

const SBCreateNegativeTargetingClauseRequest = t.strict({
  /**
   * The identifier of an existing ad group.
   * The newly created target is associated to this ad group.
   */
  adGroupId: AdGroupId,

  /**
   * The identifier of an existing campaign.
   * The newly created target is associated to this campaign.
   */
  campaignId: CampaignId,

  expressions: SBNegativeExpression,
})

export const SBCreateNegativeTargetsRequest = t.strict({
  negativeTargets: t.array(SBCreateNegativeTargetingClauseRequest),
})
export type SBCreateNegativeTargetsRequest = t.TypeOf<typeof SBCreateNegativeTargetsRequest>

export const SBCreateNegativeTargetsReponse = SBCreateTargetsReponse
export type SBCreateNegativeTargetsReponse = t.TypeOf<typeof SBCreateNegativeTargetsReponse>
