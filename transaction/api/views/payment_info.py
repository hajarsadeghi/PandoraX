from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from decorators import is_authenticated, get_space
from utils import raw_query
import json


@require_http_methods(['POST'])
@is_authenticated
@get_space
def payment_info(request):
    try:
        data = json.loads(request.body)
        point_amount = data['point_amount']
    except (KeyError, ValueError, TypeError):
        return JsonResponse({"message": "bad json"}, status=400)
    res = {'point_amount': point_amount, 'targets': []}
    query = f'''
        WITH cte AS (
          SELECT
        		`transaction_wallet`.`id`,
        		`transaction_wallet`.`point_amount`,
        		`transaction_wallet`.`type`,
        		`budget_budget`.`name` as budget_name,
        		SUM(`transaction_wallet`.`point_amount`) OVER (ORDER BY type DESC, id) AS `cumsum`
          FROM `transaction_wallet`
          INNER JOIN `budget_budget` ON (`transaction_wallet`.`budget_id` = `budget_budget`.`id`)
        	WHERE
        		(`transaction_wallet`.`space_id` = {self.space.id} AND `transaction_wallet`.`user_id` = {self.source_user.id})
        )
        SELECT
        	point_amount,
            type,
            budget_name,
        	CASE WHEN cumsum >= {self.total_point_amount} THEN (point_amount - (cumsum-{self.total_point_amount})) ELSE point_amount END AS `sub`
        FROM cte
        JOIN (
            select min(cumsum) as first_row
            from cte
            where cumsum >= {self.total_point_amount}
        ) T2
        WHERE cumsum <= `T2`.`first_row`;
    '''
    columns = ['point_amount', 'type', 'budget_name', 'sub']
    target_wallets = raw_query(query, columns=columns)
    if source_wallets:
        res['payable'] = True
        for target in target_wallets:
            tmp_target = {
                'name': 'Earned Points' if target['type'] == 0 else target['budget_name'],
                'point_amount': target['point_amount'],
                'sub': target['sub']
            }
            res['targets'].append(tmp_target)
    else:
        res['payable'] = False
    return JsonResponse(res, status=200, safe=False)
