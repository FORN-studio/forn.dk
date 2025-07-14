<script>

    import { enhance } from '$app/forms'
    import { fly } from 'svelte/transition'
    import { m } from '$lib/paraglide/messages.js'

    let textAreaRows = $state(1)
    let textareaValue = $state('')
    let sending = $state(false)
    let success = $state(false)

</script>

<div class="contact" id="contact">
    <div class="info">
        <span class="header">
            <span class="text">
                {m.contact_header_your_way()}
            </span>
            <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9998 5.00011L4.99991 4.99997L4.99988 6.99997L11.9998 7.00008L11.9999 17.1719L8.05015 13.2222L6.63594 14.6364L12.9999 21.0004L19.3639 14.6364L17.9496 13.2222L13.9999 17.172L13.9998 5.00011Z"></path></svg>
            </span>
        </span>
        <div class="rows-wrapper">
            <div class="outer-row">
                <a class="row" href="mailto:forn@forn.dk">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path></svg>
                    </span>
                    <span class="text">
                        {m.contact_email()}
                    </span>
                </a>
                <a class="row" href="tel:+4528688140">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"></path></svg>
                    </span>
                    <span class="text">
                        {m.contact_phone()}
                    </span>
                </a>
                <div class="row">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6177 5.9681L19.0711 4.51472L20.4853 5.92893L19.0319 7.38231C20.2635 8.92199 21 10.875 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.02944 7.02944 4 12 4C14.125 4 16.078 4.73647 17.6177 5.9681ZM12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20ZM11 8H13V14H11V8ZM8 1H16V3H8V1Z"></path></svg>
                    </span>
                    <span class="text">
                        {m.contact_response_time()}
                    </span>
                </div>
            </div>
    
            <div class="outer-row">
                <a class="row" href="https://www.instagram.com/forn.studio/">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z"></path></svg>
                    </span>
                    <span class="text">
                        forn.studio
                    </span>
                </a>
                <a class="row" href="https://dribbble.com/fornStudio">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.9887 11.5716C19.9029 9.94513 19.3313 8.44745 18.4163 7.22097C18.1749 7.48407 17.8785 7.7698 17.4957 8.09159C16.5881 8.85458 15.4887 9.54307 14.1834 10.101C14.3498 10.4506 14.5029 10.7899 14.6376 11.1098L14.6388 11.1125C14.6652 11.1742 14.6879 11.2306 14.7321 11.3418C14.7379 11.3562 14.7433 11.3697 14.7485 11.3825C16.2621 11.2122 17.8576 11.2749 19.4049 11.4845C19.6106 11.5123 19.805 11.5415 19.9887 11.5716ZM10.6044 4.1213C10.7783 4.36621 10.9602 4.62859 11.1803 4.95378C11.7929 5.8589 12.396 6.81391 12.9604 7.79507C13.0749 7.99416 13.187 8.19289 13.2964 8.39112C14.5193 7.90993 15.5296 7.30281 16.3438 6.62486C16.6731 6.35063 16.9383 6.093 17.1403 5.86972C15.7501 4.70277 13.9571 4 12 4C11.524 4 11.0576 4.04158 10.6044 4.1213ZM4.25266 9.99755C4.83145 9.98452 5.48467 9.94941 6.29303 9.87518C7.90024 9.72758 9.54141 9.46249 11.1549 9.05274C10.5719 8.03721 9.93888 7.02331 9.29452 6.05378C8.98479 5.58775 8.68357 5.14992 8.45484 4.82642C6.39541 5.84613 4.83794 7.72658 4.25266 9.99755ZM5.78366 17.036C6.17111 16.4693 6.68061 15.8314 7.35797 15.1374C8.81199 13.6478 10.5286 12.4878 12.5139 11.8473C12.5417 11.8391 12.5604 11.8336 12.576 11.829C12.411 11.4651 12.2562 11.1405 12.1003 10.8342C10.2643 11.3687 8.3303 11.703 6.40279 11.8762C5.46319 11.9606 4.62005 11.9981 4 12.0044C4.00102 13.9112 4.66915 15.662 5.78366 17.036ZM15.0045 19.4166C14.9001 18.8745 14.7669 18.2706 14.5899 17.574C14.2689 16.3112 13.8668 15.012 13.373 13.7078C11.3712 14.4343 9.77574 15.4974 8.54309 16.7649C7.94904 17.3757 7.51244 17.9537 7.22642 18.4203C8.55892 19.4127 10.2109 20 12 20C13.0626 20 14.0769 19.7928 15.0045 19.4166ZM16.8778 18.3414C18.4073 17.1632 19.4985 15.444 19.8652 13.4703C19.5253 13.3865 19.094 13.3005 18.6196 13.2346C17.5756 13.0897 16.5014 13.0655 15.4409 13.2018C15.8933 14.4764 16.2642 15.7332 16.5608 16.9361C16.6903 17.4614 16.7958 17.9358 16.8778 18.3414ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"></path></svg>
                    </span>
                    <span class="text">
                        fornStudio
                    </span>
                </a>
                <a class="row" href="https://www.linkedin.com/in/adrianbratlann/">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.00098 3H20.001C20.5533 3 21.001 3.44772 21.001 4V20C21.001 20.5523 20.5533 21 20.001 21H4.00098C3.44869 21 3.00098 20.5523 3.00098 20V4C3.00098 3.44772 3.44869 3 4.00098 3ZM5.00098 5V19H19.001V5H5.00098ZM7.50098 9C6.67255 9 6.00098 8.32843 6.00098 7.5C6.00098 6.67157 6.67255 6 7.50098 6C8.3294 6 9.00098 6.67157 9.00098 7.5C9.00098 8.32843 8.3294 9 7.50098 9ZM6.50098 10H8.50098V17.5H6.50098V10ZM12.001 10.4295C12.5854 9.86534 13.2665 9.5 14.001 9.5C16.072 9.5 17.501 11.1789 17.501 13.25V17.5H15.501V13.25C15.501 12.2835 14.7175 11.5 13.751 11.5C12.7845 11.5 12.001 12.2835 12.001 13.25V17.5H10.001V10H12.001V10.4295Z"></path></svg>
                    </span>
                    <span class="text">
                        Adrian E. B.
                    </span>
                </a>
            </div>
        </div>
    </div>
    
    <form class:sending method="POST" use:enhance={() => {
        sending = true
        return async (res) => {
            setTimeout(() => {
                sending = false
                success = true
            }, 1000)
        }
    }}>
        <span class="header">
            <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.0002 5.00011L19.0001 4.99997L19.0001 6.99997L12.0002 7.00008L12.0001 17.1719L15.9498 13.2222L17.3641 14.6364L11.0001 21.0004L4.63614 14.6364L6.05035 13.2222L10.0001 17.172L10.0002 5.00011Z"></path></svg>
            </span>
            <span class="text">
                <span class="strikethrough">{m.contact_header_my_way()}</span> {m.contact_header_my_way_alt()}
            </span>
        </span>
        <div class="inputs">
            <div class="form-group">
                <input required type="text" name="name" placeholder={m.contact_placeholder_name()} />
                <input required type="text" name="company" placeholder={m.contact_placeholder_organization()} />
            </div>
            <div class="form-group">
                <input required type="email" name="email" placeholder={m.contact_placeholder_email()} />
                <textarea required bind:value={textareaValue} oninput={() => {
                    if (textareaValue === '') textAreaRows = 1
                    else textAreaRows = 5
                }} name="message" placeholder={m.contact_placeholder_message()} rows={textAreaRows} style="resize: vertical;"></textarea>
            </div>
        </div>
        <button type="submit" class:disabled={sending || success}>
            {#if sending}
                <div class="inner" in:fly={{ duration: 300, y: 15 }} out:fly={{ duration: 300, y: -15 }}>
                    <span class="text">{m.contact_button_sending()}</span>
                    <span class="icon">
                        <svg class="spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path></svg>
                    </span>
                </div>
            {:else if success}
                <div class="inner success" in:fly={{ duration: 300, y: 15 }} out:fly={{ duration: 300, y: -15 }}>
                    <span class="text">{m.contact_button_success()}</span>
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM7 13H9C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13H17C17 15.7614 14.7614 18 12 18C9.23858 18 7 15.7614 7 13ZM8 11C7.17157 11 6.5 10.3284 6.5 9.5C6.5 8.67157 7.17157 8 8 8C8.82843 8 9.5 8.67157 9.5 9.5C9.5 10.3284 8.82843 11 8 11ZM16 11C15.1716 11 14.5 10.3284 14.5 9.5C14.5 8.67157 15.1716 8 16 8C16.8284 8 17.5 8.67157 17.5 9.5C17.5 10.3284 16.8284 11 16 11Z"></path></svg>
                    </span>
                </div>
            {:else}
                <div class="inner" in:fly={{ duration: 300, y: 15 }} out:fly={{ duration: 300, y: -15 }}>
                    <span class="text">{m.contact_button_send()}</span>
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.99974 13.0001L1.9996 11.0002L18.1715 11.0002L14.2218 7.05044L15.636 5.63623L22 12.0002L15.636 18.3642L14.2218 16.9499L18.1716 13.0002L1.99974 13.0001Z"></path></svg>
                    </span>
                </div>
            {/if}
        </button>
    </form>
</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .contact {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 8rem 0;

        .strikethrough {
            text-decoration: line-through;
            opacity: .5;
        }

        .info {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
            max-width: 500px;
            margin-bottom: 6rem;

            .header {
                display: flex;
                flex-direction: row;
                gap: 1rem;
                align-items: center;
                margin-bottom: 2rem;

                .icon {
                    width: 1.5rem;
                    height: 1.5rem;
                    transform: translateY(5px);
                    flex-shrink: 0;
                }
            }

            .rows-wrapper {
                display: flex;
                flex-direction: row;
                gap: 2.5rem;
                margin-left: $p-inset;

                @media (max-width: $mobile) {
                    margin-left: 0;
                    justify-content: center;
                    gap: 1.5rem;
                }

                .outer-row {
                    display: flex;
                    flex-direction: column;
                    gap: .5rem;
                }
            }

            .row {
                display: flex;
                flex-direction: row;
                gap: 1rem;
                align-items: center;

                @media (max-width: $mobile) {
                    gap: .4rem;
                }

                .icon {
                    width: 1.5rem;
                    height: 1.5rem;
                    color: $accent;
                    margin-top: -3px;
                    flex-shrink: 0;
                }

                .text {
                    font-size: $fs-sm;
                }
            }
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: center;
            align-items: flex-end;
            width: 100%;
            max-width: 500px;

            .header {
                display: flex;
                flex-direction: row;
                gap: 1rem;
                align-items: center;
                margin-bottom: 2rem;
                max-width: 30ch;

                .icon {
                    width: 1.5rem;
                    height: 1.5rem;
                    transform: translateY(5px);
                    flex-shrink: 0;
                }
            }

            .inputs {
                display: flex;
                flex-direction: column;
                gap: 2rem;
                width: 100%;

                .form-group {
                    display: flex;
                    flex-direction: row;
                    gap: 2rem;

                    @media (max-width: $mobile) {
                        flex-direction: column;
                    }

                    input { height: 41px; }

                    input, textarea {
                        padding: .5rem;
                        font-size: $fs-sm;
                        flex-grow: 1;
                        flex-basis: 0;
                        border: none;
                        border-bottom: solid 1px $black;

                        @media (max-width: $mobile) {
                            flex-basis: auto;
                        }
                    }
                }
            }

            button {
                justify-content: flex-end;
                align-items: center;
                margin-top: 2rem;
                border: none;
                font-weight: bold;
                width: 300px;
                display: grid;
                grid-template-rows: 1fr;
                grid-template-columns: 1fr;

                &.disabled {
                    cursor: not-allowed;
                    pointer-events: none;
                    opacity: 1;
                }

                .inner {
                    display: flex;
                    flex-direction: row;
                    gap: 1rem;
                    align-items: center;
                    justify-content: flex-end;
                    grid-column: 1;
                    grid-row: 1;

                    &.success {
                        color: $accent;
                    }

                    .icon {
                        width: $fs-md;
                        height: $fs-md;
                        margin-top: -2px;
                    }
                }
            }
        }
    }

    .spin {
        animation: spin .5s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

</style>