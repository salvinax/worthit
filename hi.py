import yesg
import pandas
print(yesg.get_historic_esg('SWK').iloc[-1, ])
print(yesg.get_historic_esg('AMZN').iloc[-1, ])
print(yesg.get_historic_esg('META').iloc[-1, ])

# error handling and if statement if company is not there!