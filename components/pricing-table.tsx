declare global {
    namespace JSX {
        interface IntrinsicElements {
            'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

const PricingTable = () => {
    return (
        <stripe-pricing-table 
            pricing-table-id="prctbl_1NfbsyB8IFzjw4r9iXMMznd1"
            publishable-key="pk_live_51NZnpBB8IFzjw4r9LenejixqLumUBA5gkaRItG9ZNaKv37hk2YqarYKixPnUdzuKWfGfDfCmcJ0Ai8rD17btcp5k00BKULJQdz"
        >
        </stripe-pricing-table>
    )
}

export default PricingTable;