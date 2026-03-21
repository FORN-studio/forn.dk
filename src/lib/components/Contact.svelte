<script>
	import { enhance } from '$app/forms'
	import { fly } from 'svelte/transition'
	import { m } from '$lib/paraglide/messages.js'

	let textAreaRows = $state(1)
	let textareaValue = $state('')
	let sending = $state(false)
	let success = $state(false)
	let loadedAt = $state(Date.now())
</script>

<div class="contact" id="contact">
	<div class="info">
		<span class="header">
			<span class="text">
				{m.contact_header_your_way()}
			</span>
			<span class="icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
					><path
						d="M13.9998 5.00011L4.99991 4.99997L4.99988 6.99997L11.9998 7.00008L11.9999 17.1719L8.05015 13.2222L6.63594 14.6364L12.9999 21.0004L19.3639 14.6364L17.9496 13.2222L13.9999 17.172L13.9998 5.00011Z"
					></path></svg
				>
			</span>
		</span>
		<div class="rows-wrapper">
			<div class="outer-row">
				<a class="row" href="mailto:forn@forn.dk">
					<span class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
							><path
								d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"
							></path></svg
						>
					</span>
					<span class="text">
						{m.contact_email()}
					</span>
				</a>
				<a class="row" href="tel:+4528688140">
					<span class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
							><path
								d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"
							></path></svg
						>
					</span>
					<span class="text">
						{m.contact_phone()}
					</span>
				</a>
				<div class="row">
					<span class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
							><path
								d="M17.6177 5.9681L19.0711 4.51472L20.4853 5.92893L19.0319 7.38231C20.2635 8.92199 21 10.875 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.02944 7.02944 4 12 4C14.125 4 16.078 4.73647 17.6177 5.9681ZM12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20ZM11 8H13V14H11V8ZM8 1H16V3H8V1Z"
							></path></svg
						>
					</span>
					<span class="text">
						{m.contact_response_time()}
					</span>
				</div>
			</div>

			<div class="outer-row">
				<a class="row" href="https://www.instagram.com/forn.studio/">
					<span class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
							><path
								d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z"
							></path></svg
						>
					</span>
					<span class="text">Instagram</span>
				</a>
				<a class="row" href="https://github.com/bhark">
					<span class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.88401 18.6533C5.58404 18.4526 5.32587 18.1975 5.0239 17.8369C4.91473 17.7065 4.47283 17.1524 4.55811 17.2583C4.09533 16.6833 3.80296 16.417 3.50156 16.3089C2.9817 16.1225 2.7114 15.5499 2.89784 15.0301C3.08428 14.5102 3.65685 14.2399 4.17672 14.4263C4.92936 14.6963 5.43847 15.1611 6.12425 16.0143C6.03025 15.8974 6.46364 16.441 6.55731 16.5529C6.74784 16.7804 6.88732 16.9182 6.99629 16.9911C7.20118 17.1283 7.58451 17.1874 8.14709 17.1311C8.17065 16.7489 8.24136 16.3783 8.34919 16.0358C5.38097 15.3104 3.70116 13.3952 3.70116 9.63971C3.70116 8.40085 4.0704 7.28393 4.75917 6.3478C4.5415 5.45392 4.57433 4.37284 5.06092 3.15636C5.1725 2.87739 5.40361 2.66338 5.69031 2.57352C5.77242 2.54973 5.81791 2.53915 5.89878 2.52673C6.70167 2.40343 7.83573 2.69705 9.31449 3.62336C10.181 3.41879 11.0885 3.315 12.0012 3.315C12.9129 3.315 13.8196 3.4186 14.6854 3.62277C16.1619 2.69 17.2986 2.39649 18.1072 2.52651C18.1919 2.54013 18.2645 2.55783 18.3249 2.57766C18.6059 2.66991 18.8316 2.88179 18.9414 3.15636C19.4279 4.37256 19.4608 5.45344 19.2433 6.3472C19.9342 7.28337 20.3012 8.39208 20.3012 9.63971C20.3012 13.3968 18.627 15.3048 15.6588 16.032C15.7837 16.447 15.8496 16.9105 15.8496 17.4121C15.8496 18.0765 15.8471 18.711 15.8424 19.4225C15.8412 19.6127 15.8397 19.8159 15.8375 20.1281C16.2129 20.2109 16.5229 20.5077 16.6031 20.9089C16.7114 21.4504 16.3602 21.9773 15.8186 22.0856C14.6794 22.3134 13.8353 21.5538 13.8353 20.5611C13.8353 20.4708 13.836 20.3417 13.8375 20.1145C13.8398 19.8015 13.8412 19.599 13.8425 19.4094C13.8471 18.7019 13.8496 18.0716 13.8496 17.4121C13.8496 16.7148 13.6664 16.2602 13.4237 16.051C12.7627 15.4812 13.0977 14.3973 13.965 14.2999C16.9314 13.9666 18.3012 12.8177 18.3012 9.63971C18.3012 8.68508 17.9893 7.89571 17.3881 7.23559C17.1301 6.95233 17.0567 6.54659 17.199 6.19087C17.3647 5.77663 17.4354 5.23384 17.2941 4.57702L17.2847 4.57968C16.7928 4.71886 16.1744 5.0198 15.4261 5.5285C15.182 5.69438 14.8772 5.74401 14.5932 5.66413C13.7729 5.43343 12.8913 5.315 12.0012 5.315C11.111 5.315 10.2294 5.43343 9.40916 5.66413C9.12662 5.74359 8.82344 5.69492 8.57997 5.53101C7.8274 5.02439 7.2056 4.72379 6.71079 4.58376C6.56735 5.23696 6.63814 5.77782 6.80336 6.19087C6.94565 6.54659 6.87219 6.95233 6.61423 7.23559C6.01715 7.8912 5.70116 8.69376 5.70116 9.63971C5.70116 12.8116 7.07225 13.9683 10.023 14.2999C10.8883 14.3971 11.2246 15.4769 10.5675 16.0482C10.3751 16.2156 10.1384 16.7802 10.1384 17.4121V20.5611C10.1384 21.5474 9.30356 22.2869 8.17878 22.09C7.63476 21.9948 7.27093 21.4766 7.36613 20.9326C7.43827 20.5204 7.75331 20.2116 8.13841 20.1276V19.1381C7.22829 19.1994 6.47656 19.0498 5.88401 18.6533Z"></path></svg>
					</span>
					<span class="text">Github</span>
				</a>
				<a class="row" href="https://www.linkedin.com/in/adrianbratlann/">
					<span class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
							><path
								d="M4.00098 3H20.001C20.5533 3 21.001 3.44772 21.001 4V20C21.001 20.5523 20.5533 21 20.001 21H4.00098C3.44869 21 3.00098 20.5523 3.00098 20V4C3.00098 3.44772 3.44869 3 4.00098 3ZM5.00098 5V19H19.001V5H5.00098ZM7.50098 9C6.67255 9 6.00098 8.32843 6.00098 7.5C6.00098 6.67157 6.67255 6 7.50098 6C8.3294 6 9.00098 6.67157 9.00098 7.5C9.00098 8.32843 8.3294 9 7.50098 9ZM6.50098 10H8.50098V17.5H6.50098V10ZM12.001 10.4295C12.5854 9.86534 13.2665 9.5 14.001 9.5C16.072 9.5 17.501 11.1789 17.501 13.25V17.5H15.501V13.25C15.501 12.2835 14.7175 11.5 13.751 11.5C12.7845 11.5 12.001 12.2835 12.001 13.25V17.5H10.001V10H12.001V10.4295Z"
							></path></svg
						>
					</span>
					<span class="text">LinkedIn</span>
				</a>
			</div>
		</div>
	</div>

	<form
		class:sending
		method="POST"
		use:enhance={() => {
			sending = true
			return async (res) => {
				setTimeout(() => {
					sending = false
					success = true
				}, 1000)
			}
		}}
	>
		<span class="header">
			<span class="icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
					><path
						d="M10.0002 5.00011L19.0001 4.99997L19.0001 6.99997L12.0002 7.00008L12.0001 17.1719L15.9498 13.2222L17.3641 14.6364L11.0001 21.0004L4.63614 14.6364L6.05035 13.2222L10.0001 17.172L10.0002 5.00011Z"
					></path></svg
				>
			</span>
			<span class="text">
				<span class="strikethrough">{m.contact_header_my_way()}</span>
				{m.contact_header_my_way_alt()}
			</span>
		</span>
		<input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" />
		<input type="hidden" name="t" value={loadedAt} />
		<div class="inputs">
			<div class="form-group">
				<input required type="text" name="name" placeholder={m.contact_placeholder_name()} />
				<input
					required
					type="text"
					name="company"
					placeholder={m.contact_placeholder_organization()}
				/>
			</div>
			<div class="form-group">
				<input required type="email" name="email" placeholder={m.contact_placeholder_email()} />
				<textarea
					required
					bind:value={textareaValue}
					oninput={() => {
						if (textareaValue === '') textAreaRows = 1
						else textAreaRows = 5
					}}
					name="message"
					placeholder={m.contact_placeholder_message()}
					rows={textAreaRows}
					style="resize: vertical;"
				></textarea>
			</div>
		</div>
		<button type="submit" class:disabled={sending || success}>
			{#if sending}
				<div class="inner" in:fly={{ duration: 300, y: 15 }} out:fly={{ duration: 300, y: -15 }}>
					<span class="text">{m.contact_button_sending()}</span>
					<span class="icon">
						<svg
							class="spin"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							><path
								d="M18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"
							></path></svg
						>
					</span>
				</div>
			{:else if success}
				<div
					class="inner success"
					in:fly={{ duration: 300, y: 15 }}
					out:fly={{ duration: 300, y: -15 }}
				>
					<span class="text">{m.contact_button_success()}</span>
					<span class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
							><path
								d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM7 13H9C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13H17C17 15.7614 14.7614 18 12 18C9.23858 18 7 15.7614 7 13ZM8 11C7.17157 11 6.5 10.3284 6.5 9.5C6.5 8.67157 7.17157 8 8 8C8.82843 8 9.5 8.67157 9.5 9.5C9.5 10.3284 8.82843 11 8 11ZM16 11C15.1716 11 14.5 10.3284 14.5 9.5C14.5 8.67157 15.1716 8 16 8C16.8284 8 17.5 8.67157 17.5 9.5C17.5 10.3284 16.8284 11 16 11Z"
							></path></svg
						>
					</span>
				</div>
			{:else}
				<div class="inner" in:fly={{ duration: 300, y: 15 }} out:fly={{ duration: 300, y: -15 }}>
					<span class="text">{m.contact_button_send()}</span>
					<span class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
							><path
								d="M1.99974 13.0001L1.9996 11.0002L18.1715 11.0002L14.2218 7.05044L15.636 5.63623L22 12.0002L15.636 18.3642L14.2218 16.9499L18.1716 13.0002L1.99974 13.0001Z"
							></path></svg
						>
					</span>
				</div>
			{/if}
		</button>
	</form>
</div>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	.hp {
		position: absolute;
		left: -9999px;
		opacity: 0;
		height: 0;
		width: 0;
		pointer-events: none;
	}

	.contact {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 8rem 0;

		.strikethrough {
			text-decoration: line-through;
			opacity: 0.5;
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
					gap: 0.5rem;
				}
			}

			.row {
				display: flex;
				flex-direction: row;
				gap: 1rem;
				align-items: center;

				@media (max-width: $mobile) {
					gap: 0.4rem;
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

					input {
						height: 41px;
					}

					input,
					textarea {
						padding: 0.5rem;
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
		animation: spin 0.5s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
