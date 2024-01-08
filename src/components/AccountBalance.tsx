import { Black_Han_Sans } from "next/font/google";
import { api } from "~/utils/api"

const AccountBalance = () => {
  const balanceQuery = api.transactions.getBalance.useQuery();

  const balance = balanceQuery.isFetched ? parseFloat(balanceQuery.data ?? '0').toFixed(2) : 'Loading...'
  return (
    <div className="card">
      <h2 className="text-xl">Balance</h2>
      <pre>{balance}</pre>
    </div>
  )
}

export default AccountBalance;